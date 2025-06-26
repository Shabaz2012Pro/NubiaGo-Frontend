const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Product description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    index: true // Index for price-based queries
  },
  category: {
    type: String,
    required: true,
    index: true // Index for category filtering
  },
  subcategory: {
    type: String,
    index: true
  },
  brand: {
    type: String,
    index: true
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    index: true // Index for stock filtering
  },
  images: [String],
  specifications: {
    type: Map,
    of: String
  },
  tags: {
    type: [String],
    index: true // Index for tag-based searches
  },
  rating: {
    average: { type: Number, default: 0, index: true },
    count: { type: Number, default: 0 }
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Compound indexes for common queries
productSchema.index({ category: 1, price: 1 });
productSchema.index({ category: 1, 'rating.average': -1 });
productSchema.index({ isActive: 1, stock: 1 });

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Pre-save middleware to generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);