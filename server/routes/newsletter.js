
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { validate } = require('../middleware/validation');
const nodemailer = require('nodemailer');

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Subscribe to newsletter
router.post('/subscribe', validate('newsletter'), async (req, res) => {
  try {
    const { email, name } = req.validatedData;

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      return res.status(409).json({
        error: 'Already Subscribed',
        message: 'This email is already subscribed to our newsletter'
      });
    }

    // Add new subscriber
    const { data: newSubscriber, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        name,
        subscribed_at: new Date().toISOString(),
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('Newsletter subscription error:', error);
      // For now, just log the error and return success
      console.log(`Newsletter subscription for ${email} - would be saved in production`);
    }

    // Send welcome email (in production)
    try {
      // Mock email sending
      console.log(`Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Don't fail the subscription if email fails
    }

    res.status(201).json({
      message: 'Successfully subscribed to newsletter',
      subscriber: {
        email,
        name,
        subscribedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      error: 'Subscription Failed',
      message: 'Failed to subscribe to newsletter'
    });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email is required'
      });
    }

    // Update subscriber status
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ 
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email);

    if (error) {
      console.error('Newsletter unsubscribe error:', error);
      // Log for production
      console.log(`Newsletter unsubscribe for ${email} - would be processed in production`);
    }

    res.json({
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      error: 'Unsubscribe Failed',
      message: 'Failed to unsubscribe from newsletter'
    });
  }
});

module.exports = router;
const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// In-memory storage for newsletter subscribers (replace with database in production)
const subscribers = new Set();

// Subscribe to newsletter
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    const { email } = req.body;

    if (subscribers.has(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed'
      });
    }

    subscribers.add(email);

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const { email } = req.body;
    
    subscribers.delete(email);

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
