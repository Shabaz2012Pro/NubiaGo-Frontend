import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Tag, Info } from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import { useCartStore } from '../../store/useCartStore';
import { clsx } from 'clsx';

interface CartSummaryProps {
  onCheckout?: () => void;
  className?: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  onCheckout,
  className
}) => {
  const { items, subtotal, tax, shipping, total } = useCartStore();
  
  // Check if cart is empty
  const isEmpty = items.length === 0;

  return (
    <Card variant="default" padding="lg" className={className}>
      <div className="flex items-center space-x-3 mb-6">
        <ShoppingCart className="w-5 h-5 text-neutral-500" />
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Order Summary
        </h3>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span className="font-medium text-neutral-900 dark:text-neutral-100">${shipping.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">Tax (8%)</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">Total</span>
            <span className="font-bold text-xl text-red-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {shipping === 0 && (
        <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg mb-6">
          <Truck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              Free Shipping
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              Your order qualifies for free shipping!
            </p>
          </div>
        </div>
      )}
      
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onCheckout}
        disabled={isEmpty}
        className="bg-red-600 hover:bg-red-700 mb-4"
      >
        {isEmpty ? 'Your cart is empty' : 'Proceed to Checkout'}
      </Button>
      
      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.hash = 'products'}
        >
          Continue Shopping
        </Button>
      </div>
      
      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-1 text-xs text-neutral-500">
            <Tag className="w-3 h-3" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-neutral-500">
            <Truck className="w-3 h-3" />
            <span>Fast Shipping</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-neutral-500">
            <Info className="w-3 h-3" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartSummary;