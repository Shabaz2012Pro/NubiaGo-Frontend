
const Joi = require('joi');
const rateLimit = require('express-rate-limit');
const { sanitizeInput } = require('../utils/security');

// Enhanced validation schemas
const schemas = {
  // User registration validation
  register: Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'First name can only contain letters, spaces, hyphens, and apostrophes'
      }),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Last name can only contain letters, spaces, hyphens, and apostrophes'
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .max(254)
      .required(),
    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      }),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Please enter a valid phone number'
      }),
    acceptTerms: Joi.boolean().valid(true).required(),
    marketingOptIn: Joi.boolean().optional()
  }),

  // User login validation
  login: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required(),
    password: Joi.string()
      .min(1)
      .max(128)
      .required(),
    rememberMe: Joi.boolean().optional()
  }),

  // Product creation/update validation
  product: Joi.object({
    name: Joi.string()
      .min(3)
      .max(200)
      .required(),
    description: Joi.string()
      .min(10)
      .max(5000)
      .required(),
    price: Joi.number()
      .positive()
      .precision(2)
      .max(999999.99)
      .required(),
    category: Joi.string()
      .valid('electronics', 'clothing', 'home', 'beauty', 'sports', 'automotive', 'books', 'toys', 'food', 'other')
      .required(),
    subcategory: Joi.string()
      .max(100)
      .optional(),
    sku: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .required(),
    stock: Joi.number()
      .integer()
      .min(0)
      .max(99999)
      .required(),
    images: Joi.array()
      .items(Joi.string().uri())
      .min(1)
      .max(10)
      .required(),
    specifications: Joi.object().pattern(
      Joi.string().max(50),
      Joi.string().max(500)
    ).optional(),
    tags: Joi.array()
      .items(Joi.string().max(30))
      .max(20)
      .optional(),
    isActive: Joi.boolean().optional(),
    weight: Joi.number().positive().optional(),
    dimensions: Joi.object({
      length: Joi.number().positive(),
      width: Joi.number().positive(),
      height: Joi.number().positive()
    }).optional()
  }),

  // Contact form validation
  contact: Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required(),
    subject: Joi.string()
      .min(5)
      .max(200)
      .required(),
    message: Joi.string()
      .min(10)
      .max(2000)
      .required(),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional(),
    priority: Joi.string()
      .valid('low', 'medium', 'high')
      .default('medium')
  }),

  // Order validation
  order: Joi.object({
    items: Joi.array()
      .items(Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).max(100).required(),
        price: Joi.number().positive().required()
      }))
      .min(1)
      .max(50)
      .required(),
    shippingAddress: Joi.object({
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      street: Joi.string().min(5).max(200).required(),
      city: Joi.string().min(2).max(100).required(),
      state: Joi.string().min(2).max(100).required(),
      postalCode: Joi.string().min(3).max(20).required(),
      country: Joi.string().min(2).max(100).required(),
      phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional()
    }).required(),
    paymentMethod: Joi.string()
      .valid('card', 'paypal', 'bank_transfer', 'crypto')
      .required(),
    notes: Joi.string().max(500).optional()
  }),

  // Profile update validation
  profileUpdate: Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      .optional(),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      .optional(),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional()
      .allow(''),
    dateOfBirth: Joi.date()
      .max('now')
      .optional(),
    address: Joi.object({
      street: Joi.string().min(5).max(200).optional(),
      city: Joi.string().min(2).max(100).optional(),
      state: Joi.string().min(2).max(100).optional(),
      postalCode: Joi.string().min(3).max(20).optional(),
      country: Joi.string().min(2).max(100).optional()
    }).optional(),
    preferences: Joi.object({
      language: Joi.string().valid('en', 'es', 'fr', 'de', 'it').optional(),
      currency: Joi.string().valid('USD', 'EUR', 'GBP', 'CAD', 'AUD').optional(),
      notifications: Joi.object({
        email: Joi.boolean().optional(),
        sms: Joi.boolean().optional(),
        push: Joi.boolean().optional()
      }).optional()
    }).optional()
  }),

  // Newsletter subscription validation
  newsletter: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required(),
    preferences: Joi.array()
      .items(Joi.string().valid('general', 'promotions', 'new_products', 'sales'))
      .optional()
  }),

  // Search validation
  search: Joi.object({
    query: Joi.string()
      .min(1)
      .max(200)
      .required(),
    category: Joi.string()
      .valid('electronics', 'clothing', 'home', 'beauty', 'sports', 'automotive', 'books', 'toys', 'food', 'all')
      .optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().positive().optional(),
    sortBy: Joi.string()
      .valid('relevance', 'price_asc', 'price_desc', 'name_asc', 'name_desc', 'rating', 'newest')
      .optional(),
    page: Joi.number().integer().min(1).max(1000).optional(),
    limit: Joi.number().integer().min(1).max(100).optional()
  }),

  // Password reset validation
  passwordReset: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required()
  }),

  // Password update validation
  passwordUpdate: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      })
  })
};

// Enhanced validation middleware
const validate = (schemaName) => {
  return async (req, res, next) => {
    try {
      const schema = schemas[schemaName];
      if (!schema) {
        return res.status(500).json({
          success: false,
          message: 'Invalid validation schema'
        });
      }

      // Sanitize input
      const sanitizedBody = {};
      for (const [key, value] of Object.entries(req.body || {})) {
        if (typeof value === 'string') {
          sanitizedBody[key] = sanitizeInput(value);
        } else {
          sanitizedBody[key] = value;
        }
      }

      // Validate against schema
      const { error, value } = schema.validate(sanitizedBody, {
        abortEarly: false,
        stripUnknown: true,
        convert: true
      });

      if (error) {
        const errorMessages = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }));

        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errorMessages
        });
      }

      // Replace request body with validated and sanitized data
      req.body = value;
      next();
    } catch (error) {
      console.error('Validation middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal validation error'
      });
    }
  };
};

// File upload validation
const validateFileUpload = (options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxFiles = 5
  } = options;

  return (req, res, next) => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return next();
      }

      if (req.files.length > maxFiles) {
        return res.status(400).json({
          success: false,
          message: `Maximum ${maxFiles} files allowed`
        });
      }

      for (const file of req.files) {
        // Check file size
        if (file.size > maxSize) {
          return res.status(400).json({
            success: false,
            message: `File ${file.originalname} exceeds maximum size of ${maxSize / 1024 / 1024}MB`
          });
        }

        // Check file type
        if (!allowedTypes.includes(file.mimetype)) {
          return res.status(400).json({
            success: false,
            message: `File type ${file.mimetype} is not allowed`
          });
        }

        // Additional security checks
        const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js'];
        const hassuspicious = suspiciousExtensions.some(ext => 
          file.originalname.toLowerCase().endsWith(ext)
        );

        if (hassuspicious) {
          return res.status(400).json({
            success: false,
            message: 'Potentially dangerous file type detected'
          });
        }
      }

      next();
    } catch (error) {
      console.error('File validation error:', error);
      res.status(500).json({
        success: false,
        message: 'File validation failed'
      });
    }
  };
};

// Request size validation
const validateRequestSize = (maxSize = '10mb') => {
  return (req, res, next) => {
    const contentLength = parseInt(req.get('content-length') || '0');
    const maxSizeBytes = typeof maxSize === 'string' 
      ? parseInt(maxSize.replace(/mb|kb/i, '')) * (maxSize.toLowerCase().includes('mb') ? 1024 * 1024 : 1024)
      : maxSize;

    if (contentLength > maxSizeBytes) {
      return res.status(413).json({
        success: false,
        message: 'Request too large'
      });
    }

    next();
  };
};

// Security headers validation
const validateSecurityHeaders = (req, res, next) => {
  // Check for required security headers in API requests
  const userAgent = req.get('User-Agent');
  const referer = req.get('Referer');

  // Block requests without user agent (potential bot)
  if (!userAgent) {
    return res.status(400).json({
      success: false,
      message: 'User-Agent header required'
    });
  }

  // Validate referer for sensitive operations
  if (['POST', 'PUT', 'DELETE'].includes(req.method) && referer) {
    try {
      const refererUrl = new URL(referer);
      const allowedHosts = [req.get('host'), 'localhost:5000', '0.0.0.0:5000'];
      
      if (!allowedHosts.includes(refererUrl.host)) {
        return res.status(403).json({
          success: false,
          message: 'Invalid referer'
        });
      }
    } catch (error) {
      // Invalid referer URL
      return res.status(400).json({
        success: false,
        message: 'Invalid referer format'
      });
    }
  }

  next();
};

module.exports = {
  validate,
  validateFileUpload,
  validateRequestSize,
  validateSecurityHeaders,
  schemas
};
