
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Enhanced rate limiting for admin login
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in 15 minutes.',
    lockout: true
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip + ':' + (req.body.email || 'unknown');
  }
});

// Validation middleware
const validateAdminLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('sessionInfo.ip')
    .optional()
    .isIP()
    .withMessage('Invalid IP address'),
];

// Admin login endpoint
router.post('/login', adminLoginLimiter, validateAdminLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, twoFactorCode, sessionInfo, rememberMe } = req.body;

    // Check if user exists and is admin
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .eq('role', 'admin')
      .eq('is_active', true)
      .single();

    if (userError || !user) {
      // Log failed attempt
      await logSecurityEvent({
        type: 'admin_login_failed',
        email,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        reason: 'Invalid credentials or not admin'
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      await logSecurityEvent({
        type: 'admin_login_failed',
        email,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        reason: 'Invalid password'
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Check if 2FA is required
    if (user.two_factor_enabled && !twoFactorCode) {
      // Generate and send 2FA code
      const code = generateTwoFactorCode();
      await storeTwoFactorCode(user.id, code);
      await sendTwoFactorCode(user.email, code);

      return res.json({
        success: true,
        requiresTwoFactor: true,
        message: 'Two-factor authentication code sent'
      });
    }

    // Verify 2FA code if provided
    if (user.two_factor_enabled && twoFactorCode) {
      const isCodeValid = await verifyTwoFactorCode(user.id, twoFactorCode);
      if (!isCodeValid) {
        await logSecurityEvent({
          type: 'admin_2fa_failed',
          email,
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          reason: 'Invalid 2FA code'
        });

        return res.status(401).json({
          success: false,
          message: 'Invalid two-factor authentication code'
        });
      }
    }

    // Generate JWT token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: 'admin',
      sessionId: generateSessionId(),
      ip: req.ip
    };

    const tokenExpiry = rememberMe ? '7d' : '8h';
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: tokenExpiry,
      issuer: 'nubiago-admin',
      audience: 'admin-portal'
    });

    // Update last login
    await supabase
      .from('profiles')
      .update({
        last_login: new Date().toISOString(),
        last_login_ip: req.ip
      })
      .eq('id', user.id);

    // Store admin session
    await storeAdminSession({
      userId: user.id,
      sessionId: tokenPayload.sessionId,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      location: sessionInfo?.location || 'Unknown',
      expiresAt: new Date(Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000))
    });

    // Log successful login
    await logSecurityEvent({
      type: 'admin_login_success',
      email,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      sessionId: tokenPayload.sessionId
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        permissions: user.permissions || []
      },
      session: {
        id: tokenPayload.sessionId,
        expiresAt: new Date(Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000))
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    
    await logSecurityEvent({
      type: 'admin_login_error',
      email: req.body.email,
      ip: req.ip,
      error: error.message
    });

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Admin logout endpoint
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded?.sessionId) {
        await revokeAdminSession(decoded.sessionId);
        
        await logSecurityEvent({
          type: 'admin_logout',
          email: decoded.email,
          ip: req.ip,
          sessionId: decoded.sessionId
        });
      }
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

// Get admin session info
router.get('/session', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await getAdminSession(decoded.sessionId);

    if (!session || session.revoked) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or revoked session'
      });
    }

    res.json({
      success: true,
      session: {
        id: session.id,
        user: {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role
        },
        ip: session.ip,
        location: session.location,
        createdAt: session.created_at,
        expiresAt: session.expires_at
      }
    });

  } catch (error) {
    console.error('Session check error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Helper functions
function generateTwoFactorCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateSessionId() {
  return require('crypto').randomBytes(32).toString('hex');
}

async function storeTwoFactorCode(userId, code) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  await supabase
    .from('two_factor_codes')
    .upsert({
      user_id: userId,
      code,
      expires_at: expiresAt.toISOString(),
      used: false
    });
}

async function verifyTwoFactorCode(userId, code) {
  const { data, error } = await supabase
    .from('two_factor_codes')
    .select('*')
    .eq('user_id', userId)
    .eq('code', code)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) return false;

  // Mark code as used
  await supabase
    .from('two_factor_codes')
    .update({ used: true })
    .eq('id', data.id);

  return true;
}

async function sendTwoFactorCode(email, code) {
  // Implementation depends on your email service
  console.log(`2FA Code for ${email}: ${code}`);
  // TODO: Integrate with your email service
}

async function storeAdminSession(sessionData) {
  await supabase
    .from('admin_sessions')
    .insert(sessionData);
}

async function getAdminSession(sessionId) {
  const { data, error } = await supabase
    .from('admin_sessions')
    .select('*')
    .eq('sessionId', sessionId)
    .single();

  return error ? null : data;
}

async function revokeAdminSession(sessionId) {
  await supabase
    .from('admin_sessions')
    .update({ revoked: true })
    .eq('sessionId', sessionId);
}

async function logSecurityEvent(eventData) {
  await supabase
    .from('security_logs')
    .insert({
      ...eventData,
      timestamp: new Date().toISOString()
    });
}

module.exports = router;
