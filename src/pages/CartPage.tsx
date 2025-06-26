import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Breadcrumb from '../components/molecules/Breadcrumb';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import CartSummary from '../components/molecules/CartSummary';
import { useCartStore } from '../store/useCartStore';
import { useAddToCart, useRemoveFromCart, useUpdateCartItemQuantity } from '../api/queries/useCartQueries';
import { useUIStore } from '../store/useUIStore';

const CartPage: React.FC = () => {
  const { items, subtotal } = useCartStore();
  const { openModal } = useUIStore();
  
  // Use cart mutations
  const { mutate: updateQuantity } = useUpdateCartItemQuantity();
  const { mutate: removeItem } = useRemoveFromCart();
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Shopping Cart', current: true }
  ];
  
  // Handle quantity change
  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) return;
    try {
      updateQuantity({ cartItemId: itemId, quantity });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };
  
  // Handle remove item
  const handleRemoveItem = (itemId: string) => {
    try {
      removeItem(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (items.length === 0) return;
    openModal('checkout');
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      useCartStore.getState().clearCart();
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
            Shopping Cart
          </h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Your cart is empty
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet. 
                Browse our products and find something you like.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.hash = 'products'}
                className="bg-red-600 hover:bg-red-700"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card variant="default" padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                      Cart Items ({items.length})
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={handleClearCart}
                      aria-label="Clear all items from cart"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        variants={itemVariants}
                        className="flex items-center space-x-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                      >
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            {item.product.supplier.name}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="flex items-center border border-neutral-300 dark:border-neutral-600 rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.id || item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Decrease quantity"
                                type="button"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-1 font-medium" aria-label={`Quantity: ${item.quantity}`}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id || item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                aria-label="Increase quantity"
                                type="button"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-neutral-900 dark:text-neutral-100">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-neutral-500">
                            ${item.product.price.toFixed(2)} each
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id || item.product.id)}
                            className="text-red-500 hover:text-red-700 text-sm mt-2 transition-colors"
                            aria-label={`Remove ${item.product.name} from cart`}
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                    <Button
                      variant="outline"
                      leftIcon={<ShoppingBag className="w-4 h-4" />}
                      onClick={() => window.location.hash = 'products'}
                      aria-label="Continue shopping for more products"
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      variant="primary"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={handleCheckout}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={items.length === 0}
                      aria-label="Proceed to checkout with current cart items"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </Card>
              </div>
              
              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <CartSummary onCheckout={handleCheckout} />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;