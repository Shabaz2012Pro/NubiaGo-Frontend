import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import ProductDetail from '../components/organisms/ProductDetail';
import ShoppingCart from '../components/organisms/ShoppingCart';
import CheckoutFlow from '../components/organisms/CheckoutFlow';
import Breadcrumb from '../components/molecules/Breadcrumb';
import ProductErrorBoundary from '../components/molecules/ProductErrorBoundary';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';
import { getProductIdFromHash } from '../utils/hashUtils';

const ProductDetailPage: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [relatedProductIds, setRelatedProductIds] = useState<string[]>([]);

  // Get cart state from store
  const { isOpen: isCartOpen, closeCart } = useCartStore();

  // Get UI state from store
  const { activeModal, openModal, closeModal } = useUIStore();

  // Extract product ID from URL
  useEffect(() => {
    const id = getProductIdFromHash();

    if (id) {
      setProductId(id);

      // Set mock related product IDs
      // In a real app, these would come from an API call
      setRelatedProductIds(['2', '3', '4']);
    }

    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, []);

  // Listen for hash changes to handle product navigation
  useEffect(() => {
    const handleHashChange = () => {
      const newId = getProductIdFromHash();

      if (newId && newId !== productId) {
        setProductId(newId);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [productId]);

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#products' },
    { label: 'Product Details', current: true }
  ];

  const handleCheckout = () => {
    closeCart();
    openModal('checkout');
  };

  const handleOrderComplete = () => {
    console.log('Order completed successfully!');
    closeModal();
    // Here you would typically redirect to a success page
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />

      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Product Detail */}
        <ProductErrorBoundary productId={productId}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductDetail
              productId={productId}
              relatedProductIds={relatedProductIds}
            />
          </motion.div>
        </ProductErrorBoundary>
      </main>

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Flow */}
      <CheckoutFlow
        isOpen={activeModal === 'checkout'}
        onClose={closeModal}
        onComplete={handleOrderComplete}
      />

      <Footer />
    </div>
  );
};

export default ProductDetailPage;