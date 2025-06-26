const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// In-memory cart storage (replace with Redis in production)
const carts = new Map();

// Get cart
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = carts.get(userId) || { items: [], total: 0 };

    // Populate product details
    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId).select('name price images category');
        return {
          ...item,
          product
        };
      })
    );

    res.json({
      success: true,
      data: {
        items: populatedItems,
        total: cart.total,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add item to cart
router.post('/add', auth, [
  body('productId').isMongoId(),
  body('quantity').isInt({ min: 1 })
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

    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    // Check if product exists and is available
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or not available'
      });
    }

    // Check inventory
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient inventory'
      });
    }

    // Get or create cart
    let cart = carts.get(userId) || { items: [], total: 0 };

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].total = cart.items[existingItemIndex].quantity * product.price;
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        price: product.price,
        total: quantity * product.price
      });
    }

    // Recalculate cart total
    cart.total = cart.items.reduce((sum, item) => sum + item.total, 0);

    // Save cart
    carts.set(userId, cart);

    res.json({
      success: true,
      message: 'Item added to cart',
      data: {
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
        total: cart.total
      }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update cart item quantity
router.put('/item/:productId', auth, [
  body('quantity').isInt({ min: 0 })
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

    const userId = req.user.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    let cart = carts.get(userId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity === 0) {
      // Remove item
      cart.items.splice(itemIndex, 1);
    } else {
      // Check inventory
      const product = await Product.findById(productId);
      if (product.inventory.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient inventory'
        });
      }

      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].total = quantity * cart.items[itemIndex].price;
    }

    // Recalculate cart total
    cart.total = cart.items.reduce((sum, item) => sum + item.total, 0);

    // Save cart
    carts.set(userId, cart);

    res.json({
      success: true,
      message: 'Cart updated',
      data: {
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
        total: cart.total
      }
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Remove item from cart
router.delete('/item/:productId', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    let cart = carts.get(userId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + item.total, 0);

    carts.set(userId, cart);

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: {
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
        total: cart.total
      }
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    carts.set(userId, { items: [], total: 0 });

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;