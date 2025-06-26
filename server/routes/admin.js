
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    // Mock dashboard data
    const dashboardStats = {
      overview: {
        totalUsers: 1234,
        totalOrders: 567,
        totalProducts: 89,
        totalRevenue: 45678.90,
        monthlyGrowth: {
          users: 12.5,
          orders: 8.3,
          revenue: 15.7
        }
      },
      recentOrders: [
        {
          id: 'order-1',
          orderNumber: 'ORD-12345',
          customer: 'John Doe',
          total: 299.99,
          status: 'processing',
          createdAt: '2024-01-20T10:30:00Z'
        },
        {
          id: 'order-2',
          orderNumber: 'ORD-12346',
          customer: 'Jane Smith',
          total: 149.99,
          status: 'shipped',
          createdAt: '2024-01-19T14:20:00Z'
        }
      ],
      topProducts: [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          sales: 45,
          revenue: 8999.55
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          sales: 32,
          revenue: 9599.68
        }
      ],
      salesChart: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [12000, 15000, 18000, 22000, 25000, 28000]
      }
    };

    res.json({
      dashboard: dashboardStats
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      error: 'Dashboard Error',
      message: 'Failed to fetch dashboard data'
    });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    // Mock users data
    const mockUsers = [
      {
        id: 'user-1',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'buyer',
        verified: true,
        createdAt: '2024-01-10T10:00:00Z',
        lastLogin: '2024-01-20T09:30:00Z'
      },
      {
        id: 'user-2',
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'supplier',
        verified: true,
        createdAt: '2024-01-08T14:20:00Z',
        lastLogin: '2024-01-19T16:45:00Z'
      }
    ];

    let filteredUsers = mockUsers;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.email.toLowerCase().includes(searchLower) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower)
      );
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      users: paginatedUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({
      error: 'Users Error',
      message: 'Failed to fetch users'
    });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    // Mock orders data
    const mockOrders = [
      {
        id: 'order-1',
        orderNumber: 'ORD-12345',
        customer: {
          id: 'user-1',
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        total: 299.99,
        status: 'processing',
        createdAt: '2024-01-20T10:30:00Z',
        itemCount: 2
      },
      {
        id: 'order-2',
        orderNumber: 'ORD-12346',
        customer: {
          id: 'user-2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com'
        },
        total: 149.99,
        status: 'shipped',
        createdAt: '2024-01-19T14:20:00Z',
        itemCount: 1
      }
    ];

    let filteredOrders = mockOrders;

    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    res.json({
      orders: paginatedOrders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Admin orders error:', error);
    res.status(500).json({
      error: 'Orders Error',
      message: 'Failed to fetch orders'
    });
  }
});

// Update order status
router.patch('/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Status is required'
      });
    }

    // Mock order status update
    console.log(`Order ${orderId} status updated to: ${status}`);

    res.json({
      message: 'Order status updated successfully',
      orderId,
      status
    });

  } catch (error) {
    console.error('Admin order update error:', error);
    res.status(500).json({
      error: 'Update Error',
      message: 'Failed to update order status'
    });
  }
});

// Get site settings
router.get('/settings', async (req, res) => {
  try {
    const mockSettings = {
      site: {
        name: 'NubiaGO',
        description: 'Premium marketplace connecting Turkish suppliers with African markets',
        logo: '/brandmark-design-1024x0 (3).png',
        favicon: '/vite.svg',
        theme: 'default'
      },
      email: {
        fromName: 'NubiaGO Team',
        fromEmail: 'noreply@nubiago.com',
        supportEmail: 'support@nubiago.com'
      },
      shipping: {
        freeShippingThreshold: 100,
        standardShippingCost: 10,
        expressShippingCost: 25
      },
      tax: {
        rate: 0.1,
        enabled: true
      }
    };

    res.json({
      settings: mockSettings
    });

  } catch (error) {
    console.error('Admin settings error:', error);
    res.status(500).json({
      error: 'Settings Error',
      message: 'Failed to fetch settings'
    });
  }
});

module.exports = router;
const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Admin middleware
const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Apply auth middleware to all admin routes
router.use(auth);
router.use(adminAuth);

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, totalRevenue] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $in: ['delivered', 'confirmed'] } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ])
    ]);

    const recentOrders = await Order.find()
      .populate('customer', 'firstName lastName email')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue: totalRevenue[0]?.total || 0
        },
        recentOrders
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    const filter = {};
    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }
    
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await User.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const orders = await Order.find(filter)
      .populate('customer', 'firstName lastName email')
      .populate('items.product', 'name')
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
    console.error('Admin get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
