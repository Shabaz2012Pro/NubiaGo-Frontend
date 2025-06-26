const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

// Only create Supabase client if environment variables are properly set
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && 
    process.env.SUPABASE_URL !== 'your_supabase_url_here/' &&
    process.env.SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here') {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}

// Enhanced JWT authentication
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists and is active
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', decoded.userId)
      .single()

    if (error || !user || !user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Check token expiration
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp <= now) {
      return res.status(401).json({
        success: false,
        message: 'Token has expired'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Role-based authorization
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Optional authentication (for public/private content)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { data: user, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', decoded.userId)
        .single()

      if (!error && user && user.is_active) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Session tracking middleware
const trackSession = (req, res, next) => {
  if (req.user) {
    // Assuming 'profiles' table has 'last_activity' column
    supabase
      .from('profiles')
      .update({ last_activity: new Date() })
      .eq('id', req.user.id)
      .then(() => {})
      .catch(err => console.error('Session tracking error:', err));
  }
  next();
};

module.exports = {
  authenticateToken,
  authorize,
  optionalAuth,
  trackSession
};