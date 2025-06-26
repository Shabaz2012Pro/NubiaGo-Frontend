import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  Shield, 
  Tag,
  Gift,
  MapPin,
  CreditCard
} from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Input from '../atoms/Input';
import { clsx } from 'clsx';
import { useCartStore } from '../../store/useCartStore';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  className?: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  onCheckout,
  className
}) => {
  const { items, updateQuantity, removeItem, subtotal, tax, shipping, total } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [shippingCountry, setShippingCountry] = useState('Nigeria');

  const africanCountries = [
    { name: 'Nigeria', shipping: 25, flag: '🇳🇬' },
    { name: 'Ghana', shipping: 30, flag: '🇬🇭' },
    { name: 'Kenya', shipping: 35, flag: '🇰🇪' },
    { name: 'South Africa', shipping: 40, flag: '🇿🇦' },
    { name: 'Egypt', shipping: 28, flag: '🇪🇬' },
    { name: 'Morocco', shipping: 32, flag: '🇲🇦' }
  ];

  const applyPromoCode = () => {
    if (!promoCode) return;
    
    // Mock promo codes
    const validCodes = {
      'WELCOME10': 10,
      'AFRICA20': 20,
      'NEWUSER15': 15
    };
    
    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo(promoCode);
      setPromoCode('');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const selectedCountry = africanCountries.find(c => c.name === shippingCountry);
  const shippingCost = selectedCountry?.shipping || 0;
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%',
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const handleQuantityChange = async (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    try {
      await updateQuantity(productId, quantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      removeItem(productId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Cart Panel */}
          <motion.div
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              'fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl z-50 flex flex-col',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Shopping Cart
                </h2>
                <Badge variant="primary" size="sm">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Add some products to get started
                  </p>
                  <Button variant="primary" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="flex items-start space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-neutral-500 mb-2">
                            by {item.product.supplier.name}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 rounded-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-600"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-600"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleRemoveItem(item.product.id)}
                              className="text-red-500 hover:text-red-700 text-sm transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              ${item.product.price} each
                            </span>
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Promo Code */}
                  <Card variant="outlined" padding="md">
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        Promo Code
                      </span>
                    </div>
                    
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Gift className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            {appliedPromo} Applied
                          </span>
                        </div>
                        <button
                          onClick={removePromoCode}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={setPromoCode}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          onClick={applyPromoCode}
                          disabled={!promoCode}
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </Card>

                  {/* Shipping Calculator */}
                  <Card variant="outlined" padding="md">
                    <div className="flex items-center space-x-2 mb-3">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        Shipping to
                      </span>
                    </div>
                    
                    <select
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                    >
                      {africanCountries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.flag} {country.name} - ${country.shipping}
                        </option>
                      ))}
                    </select>
                  </Card>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-200 dark:border-neutral-700 p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Shipping to {selectedCountry?.flag} {shippingCountry}:
                    </span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Tax (10%):</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({appliedPromo}):</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                        Total:
                      </span>
                      <span className="font-bold text-lg text-red-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center space-x-6 py-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-center space-x-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <Shield className="w-3 h-3" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <Truck className="w-3 h-3" />
                    <span>Fast Shipping</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <CreditCard className="w-3 h-3" />
                    <span>Safe Payment</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={onCheckout}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={onClose}
                  className="text-neutral-500"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;