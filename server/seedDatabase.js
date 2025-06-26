
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nubiago-marketplace');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Create a default supplier user if none exists
    let supplier = await User.findOne({ role: 'supplier' });
    if (!supplier) {
      supplier = new User({
        firstName: 'Default',
        lastName: 'Supplier',
        email: 'supplier@nubiago.com',
        password: 'hashedpassword123', // In real app, this would be properly hashed
        role: 'supplier',
        isVerified: true
      });
      await supplier.save();
      console.log('Created default supplier');
    }

    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality.',
        price: 199.99,
        category: 'Electronics',
        subcategory: 'Audio',
        brand: 'AudioTech Pro',
        sku: 'WBH-001',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
        ],
        tags: ['wireless', 'bluetooth', 'headphones', 'audio', 'noise-cancelling'],
        specifications: {
          'Battery Life': '30 hours',
          'Connectivity': 'Bluetooth 5.0',
          'Noise Cancellation': 'Active',
          'Weight': '250g'
        },
        inventory: { quantity: 50 },
        ratings: { average: 4.7, count: 234 },
        supplier: supplier._id,
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Smartphone Pro Max',
        slug: 'smartphone-pro-max',
        description: 'Latest smartphone with advanced camera system, 5G connectivity, and all-day battery life.',
        price: 999.99,
        category: 'Electronics',
        subcategory: 'Mobile Phones',
        brand: 'TechMobile',
        sku: 'SPM-002',
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
        ],
        tags: ['smartphone', 'mobile', '5g', 'camera', 'premium'],
        specifications: {
          'Screen Size': '6.7 inches',
          'Storage': '256GB',
          'Camera': '108MP Triple Camera',
          'Battery': '4500mAh'
        },
        inventory: { quantity: 30 },
        ratings: { average: 4.8, count: 189 },
        supplier: supplier._id,
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Gaming Laptop Elite',
        slug: 'laptop-gaming-elite',
        description: 'High-performance gaming laptop with RTX graphics, fast SSD storage, and RGB backlit keyboard.',
        price: 1499.99,
        category: 'Electronics',
        subcategory: 'Computers',
        brand: 'GameForce',
        sku: 'GLE-003',
        images: [
          'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
        ],
        tags: ['laptop', 'gaming', 'computer', 'rtx', 'rgb'],
        specifications: {
          'Processor': 'Intel i7-12700H',
          'Graphics': 'RTX 4060',
          'RAM': '16GB DDR4',
          'Storage': '1TB SSD'
        },
        inventory: { quantity: 15 },
        ratings: { average: 4.6, count: 156 },
        supplier: supplier._id,
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Smart Fitness Watch',
        slug: 'smart-watch-fitness',
        description: 'Advanced fitness tracking with health monitoring, GPS, and long-lasting battery.',
        price: 299.99,
        category: 'Electronics',
        subcategory: 'Wearables',
        brand: 'FitTrack',
        sku: 'SFW-004',
        images: [
          'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500',
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
        ],
        tags: ['smartwatch', 'fitness', 'health', 'gps', 'tracking'],
        specifications: {
          'Display': '1.4 inch AMOLED',
          'Battery Life': '14 days',
          'Water Resistance': '5ATM',
          'Sensors': 'Heart Rate, SpO2, GPS'
        },
        inventory: { quantity: 40 },
        ratings: { average: 4.5, count: 278 },
        supplier: supplier._id,
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Wireless Earbuds Pro',
        slug: 'wireless-earbuds-pro',
        description: 'True wireless earbuds with premium sound quality and active noise cancellation.',
        price: 149.99,
        category: 'Electronics',
        subcategory: 'Audio',
        brand: 'SoundPro',
        sku: 'WEP-005',
        images: [
          'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
          'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'
        ],
        tags: ['earbuds', 'wireless', 'audio', 'noise-cancelling', 'portable'],
        specifications: {
          'Battery Life': '8 hours + 24 hours case',
          'Connectivity': 'Bluetooth 5.2',
          'Charging': 'USB-C + Wireless',
          'Water Resistance': 'IPX7'
        },
        inventory: { quantity: 60 },
        ratings: { average: 4.4, count: 192 },
        supplier: supplier._id,
        isActive: true,
        isFeatured: false
      }
    ];

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products successfully`);

    // Display created products
    createdProducts.forEach(product => {
      console.log(`- ${product.name} (${product.slug}) - $${product.price}`);
    });

  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

const main = async () => {
  await connectDB();
  await seedProducts();
  console.log('Database seeding completed');
  process.exit(0);
};

if (require.main === module) {
  main();
}

module.exports = { seedProducts };
