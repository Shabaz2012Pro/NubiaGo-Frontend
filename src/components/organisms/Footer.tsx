import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Shield,
  Truck,
  CreditCard,
  Award,
  Star,
  Globe,
  RefreshCw
} from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterMessage('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterMessage('Please enter a valid email address');
      setNewsletterLoading(false);
      return;
    }

    try {
      // API call to subscribe to newsletter
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        setNewsletterMessage('Successfully subscribed to newsletter!');
        setNewsletterEmail('');
      } else {
        const errorData = await response.json();
        setNewsletterMessage(errorData.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setNewsletterMessage('Network error. Please try again later.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className={clsx('bg-neutral-900 text-white', className)}>
      {/* Trust Indicators */}
      <div className="bg-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Secure Payments</h4>
                <p className="text-xs text-neutral-400">SSL Protected</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Fast Shipping</h4>
                <p className="text-xs text-neutral-400">Worldwide Delivery</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Quality Assured</h4>
                <p className="text-xs text-neutral-400">Verified Suppliers</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Premium Support</h4>
                <p className="text-xs text-neutral-400">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orange Separator */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-8">
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">n</span>
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                    NubiaGo
                  </h2>
                  <p className="text-xs text-neutral-400">Premium Marketplace</p>
                </div>
              </div>

              <p className="text-neutral-300 mb-6 leading-relaxed">
                Connecting premium Turkish suppliers with African markets. Your trusted gateway to quality products, 
                verified suppliers, and seamless international trade.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  <span className="text-sm text-neutral-300">Istanbul, Turkey • Lagos, Nigeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span className="text-sm text-neutral-300">+90 212 XXX XXXX</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gold-400" />
                  <span className="text-sm text-neutral-300">hello@nubiago.com</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-display font-semibold text-lg mb-6">Categories</h3>
              <ul className="space-y-3">
                <li><Link to="/products?category=electronics" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Electronics & Tech</Link></li>
                <li><Link to="/products?category=home-appliances" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Home Appliances</Link></li>
                <li><Link to="/products?category=fashion" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Fashion & Apparel</Link></li>
                <li><Link to="/products?category=beauty" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Beauty & Personal Care</Link></li>
                <li><Link to="/products?category=sports" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Sports & Fitness</Link></li>
                <li><Link to="/products?category=automotive" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Automotive</Link></li>
                <li><Link to="/products?category=food-beverage" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Food & Beverage</Link></li>
                <li><Link to="/products" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">View All Categories</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-display font-semibold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                <li><Link to="/help" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Help Center</Link></li>
                <li><Link to="/contact" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Contact Us</Link></li>
                <li><Link to="/shipping-info" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Shipping Info</Link></li>
                <li><Link to="/returns-refunds" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Returns & Refunds</Link></li>
                <li><Link to="/size-guide" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Size Guide</Link></li>
                <li><Link to="/track-order" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Track Your Order</Link></li>
                <li><Link to="/faq" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">FAQ</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-display font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">About NubiaGo</Link></li>
                <li><Link to="/careers" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Careers</Link></li>
                <li><Link to="/press-media" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Press & Media</Link></li>
                <li><Link to="/investors" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Investor Relations</Link></li>
                <li><Link to="/become-supplier" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Become a Supplier</Link></li>
                <li><Link to="/affiliate" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Affiliate Program</Link></li>
                <li><Link to="/privacy-policy" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="text-neutral-300 hover:text-gold-400 transition-colors text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-sm text-neutral-400">
                © 2024 NubiaGo. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Link to="/privacy-policy" className="text-neutral-400 hover:text-gold-400 transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-neutral-400 hover:text-gold-400 transition-colors">Terms of Service</Link>
                <Link to="/cookie-policy" className="text-neutral-400 hover:text-gold-400 transition-colors">Cookie Policy</Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-400 mr-2">Follow us:</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-400 mr-2">We accept:</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-blue-500 rounded text-xs flex items-center justify-center font-bold">
                  PP
                </div>
                <CreditCard className="w-5 h-5 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;