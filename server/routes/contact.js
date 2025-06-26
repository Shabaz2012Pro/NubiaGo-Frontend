
const express = require('express');
const { validate } = require('../middleware/validation');
const nodemailer = require('nodemailer');

const router = express.Router();

// Contact form submission
router.post('/', validate('contact'), async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.validatedData;

    // Mock email sending (in production, use actual email service)
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      phone,
      timestamp: new Date().toISOString()
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send email to support team
    // 3. Send confirmation email to user

    res.status(201).json({
      message: 'Message sent successfully! We will get back to you soon.',
      contactId: `contact-${Date.now()}`
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Message Failed',
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// Get contact information
router.get('/info', (req, res) => {
  try {
    const contactInfo = {
      address: {
        street: '123 Business Street',
        city: 'Lagos',
        state: 'Lagos State',
        postalCode: '100001',
        country: 'Nigeria'
      },
      phone: '+234 XXX XXX XXXX',
      email: 'contact@nubiago.com',
      supportEmail: 'support@nubiago.com',
      businessHours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      socialMedia: {
        facebook: 'https://facebook.com/nubiago',
        twitter: 'https://twitter.com/nubiago',
        instagram: 'https://instagram.com/nubiago',
        linkedin: 'https://linkedin.com/company/nubiago'
      }
    };

    res.json({
      contact: contactInfo
    });

  } catch (error) {
    console.error('Contact info error:', error);
    res.status(500).json({
      error: 'Info Error',
      message: 'Failed to fetch contact information'
    });
  }
});

module.exports = router;
const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Submit contact form
router.post('/', [
  body('name').trim().isLength({ min: 1 }),
  body('email').isEmail().normalizeEmail(),
  body('subject').trim().isLength({ min: 1 }),
  body('message').trim().isLength({ min: 10 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, email, subject, message, phone } = req.body;

    // Here you would typically save to database and send email
    console.log('Contact form submission:', { name, email, subject, message, phone });

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
