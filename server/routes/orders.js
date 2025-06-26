
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { authenticateToken } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get user orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    // Mock orders for development
    const mockOrders = [
      {
        id: 'order-1',
        orderNumber: 'ORD-12345',
        status: 'delivered',
        total: 299.98,
        subtotal: 279.98,
        tax: 20.00,
        shippingCost: 0,
        discount: 0,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-18T15:45:00Z',
        items: [
          {
            id: 'item-1',
            productId: '1',
            productName: 'Premium Wireless Headphones',
            quantity: 1,
            price: 199.99,
            total: 199.99
          },
          {
            id: 'item-2',
            productId: '2',
            productName: 'Smart Fitness Watch',
            quantity: 1,
            price: 299.99,
            total: 299.99
          }
        ],
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          addressLine1: '123 Main St',
          city: 'Lagos',
          state: 'Lagos State',
          postalCode: '100001',
          country: 'Nigeria'
        }
      }
    ];

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedOrders = mockOrders.slice(startIndex, endIndex);

    res.json({
      orders: paginatedOrders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: mockOrders.length,
        totalPages: Math.ceil(mockOrders.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({
      error: 'Orders Error',
      message: 'Failed to fetch orders'
    });
  }
});

// Get order by ID
router.get('/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    // Mock order for development
    const mockOrder = {
      id: orderId,
      orderNumber: 'ORD-12345',
      status: 'delivered',
      total: 299.98,
      subtotal: 279.98,
      tax: 20.00,
      shippingCost: 0,
      discount: 0,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-18T15:45:00Z',
      items: [
        {
          id: 'item-1',
          productId: '1',
          productName: 'Premium Wireless Headphones',
          quantity: 1,
          price: 199.99,
          total: 199.99
        }
      ],
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        addressLine1: '123 Main St',
        city: 'Lagos',
        state: 'Lagos State',
        postalCode: '100001',
        country: 'Nigeria'
      },
      trackingNumber: 'TRK-987654321'
    };

    res.json({
      order: mockOrder
    });

  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({
      error: 'Order Error',
      message: 'Failed to fetch order'
    });
  }
});

// Create new order
router.post('/', authenticateToken, validate('createOrder'), async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod, notes } = req.validatedData;
    const userId = req.user.id;

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    const orderId = uuidv4();

    // Calculate totals (in production, get prices from database)
    let subtotal = 0;
    items.forEach(item => {
      subtotal += 199.99 * item.quantity; // Mock price
    });

    const tax = subtotal * 0.1; // 10% tax
    const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shippingCost;

    // Mock order creation
    const newOrder = {
      id: orderId,
      orderNumber,
      userId,
      status: 'processing',
      subtotal,
      tax,
      shippingCost,
      total,
      items,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      notes,
      createdAt: new Date().toISOString(),
      trackingNumber: `TRK-${Date.now().toString().slice(-6)}`
    };

    // In production, save to database and process payment
    console.log('Order created:', newOrder);

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      error: 'Order Error',
      message: 'Failed to create order'
    });
  }
});

// Track order
router.post('/track', validate('trackOrder'), async (req, res) => {
  try {
    const { orderNumber } = req.validatedData;

    // Mock tracking data
    const trackingData = {
      orderNumber,
      trackingNumber: 'TRK-987654321',
      carrier: 'NubiaGO Express',
      estimatedDelivery: '2024-01-25',
      status: 'in_transit',
      statusText: 'In Transit',
      progress: 60,
      origin: 'Istanbul, Turkey',
      destination: 'Lagos, Nigeria',
      events: [
        {
          date: '2024-01-15',
          time: '09:15 AM',
          location: 'Istanbul, Turkey',
          status: 'Order Processed',
          description: 'Your order has been processed and is ready for shipment.'
        },
        {
          date: '2024-01-16',
          time: '02:30 PM',
          location: 'Istanbul, Turkey',
          status: 'Package Shipped',
          description: 'Your package has been shipped and is on its way.'
        },
        {
          date: '2024-01-18',
          time: '10:45 AM',
          location: 'Cairo, Egypt',
          status: 'In Transit',
          description: 'Your package has arrived at the transit facility.'
        }
      ]
    };

    res.json({
      tracking: trackingData
    });

  } catch (error) {
    console.error('Order tracking error:', error);
    res.status(500).json({
      error: 'Tracking Error',
      message: 'Failed to track order'
    });
  }
});

// Cancel order
router.patch('/:orderId/cancel', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    // Mock order cancellation
    console.log(`Order ${orderId} cancelled by user ${userId}`);

    res.json({
      message: 'Order cancelled successfully'
    });

  } catch (error) {
    console.error('Order cancellation error:', error);
    res.status(500).json({
      error: 'Order Error',
      message: 'Failed to cancel order'
    });
  }
});

module.exports = router;
const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = { customer: req.user.userId };
    if (status) filter.status = status;
    
    const orders = await Order.find(filter)
      .populate('items.product', 'name images price')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Order.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images price category')
      .populate('customer', 'firstName lastName email');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if user owns the order
    if (order.customer._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create order from cart
router.post('/create', auth, [
  body('items').isArray({ min: 1 }),
  body('shippingAddress').isObject(),
  body('paymentMethod').notEmpty()
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
    
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;
    
    // Validate products and calculate totals
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.productId} not available`
        });
      }
      
      if (product.inventory.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient inventory for ${product.name}`
        });
      }
      
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });
    }
    
    // Calculate tax and shipping (simplified)
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shipping;
    
    // Create order
    const order = new Order({
      customer: req.user.userId,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    await order.save();
    
    // Update product inventory
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'inventory.quantity': -item.quantity }
      });
    }
    
    await order.populate('items.product', 'name images price');
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update order status (admin only)
router.put('/:id/status', auth, [
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
], async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product', 'name');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Cancel order
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if user owns the order
    if (order.customer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    // Can only cancel pending or confirmed orders
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled'
      });
    }
    
    // Update order status
    order.status = 'cancelled';
    await order.save();
    
    // Restore inventory
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'inventory.quantity': item.quantity }
      });
    }
    
    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
