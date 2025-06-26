const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/nubiago';

    console.log('📊 Attempting to connect to database...');

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);

    // For development, continue without database
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Continuing without database connection in development mode');
      return null;
    }

    process.exit(1);
  }
};

const checkDatabaseHealth = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
      return { status: 'connected', message: 'Database is healthy' };
    } else {
      return { status: 'disconnected', message: 'Database not connected' };
    }
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = { connectDB, checkDatabaseHealth };