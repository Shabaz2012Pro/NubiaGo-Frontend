import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Users, 
  Globe, 
  TrendingUp, 
  Shield,
  Zap,
  Award,
  Database,
  Package,
  ArrowRight,
  Truck
} from 'lucide-react';
import { Card } from '../components/atoms/Card';
import { Button } from '../components/atoms/Button';
import FeaturedProducts from '../components/organisms/FeaturedProducts';
import { Badge } from '../components/atoms/Badge';
import { LazyImage } from '../components/atoms/LazyImage';
import { imageOptimizer } from '../utils/imageOptimizer';
import { useProductStore } from '../store/useProductStore';
import { useAuthStore } from '../store/useAuthStore';
import { testSupabaseConnection } from '../utils/supabaseTest';
import ImageSlider from '../components/organisms/ImageSlider';
import CategoriesGrid from '../components/organisms/CategoriesGrid';
import TrustIndicators from '../components/organisms/TrustIndicators';
import Newsletter from '../components/organisms/Newsletter';
import { Suspense } from 'react';

// Lazy-loaded components
const RecentlyViewed = React.lazy(() => import('../components/molecules/RecentlyViewed'));
const PersonalizedRecommendations = React.lazy(() => import('../components/molecules/PersonalizedRecommendations'));

const HomePage: React.FC = () => {
  const { searchProducts } = useProductStore();
  const { user } = useAuthStore();
  const [supabaseTestResult, setSupabaseTestResult] = useState<string>('');

  // Handle hero CTA click
  const handleExploreProducts = useCallback(() => {
    // Track analytics
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'hero_cta_explore_products'
      });
    }
  }, []);

  // Test Supabase connection
  const handleTestSupabase = async () => {
    setSupabaseTestResult('Testing connection...');
    const result = await testSupabaseConnection();
    setSupabaseTestResult(result.success ? 'Connection successful!' : `Error: ${result.error}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <main>
        <ImageSlider />
        <CategoriesGrid />
        <FeaturedProducts />
        <Suspense fallback={<div className="py-8"></div>}>
          <PersonalizedRecommendations />
        </Suspense>
        <Suspense fallback={<div className="py-8"></div>}>
          <RecentlyViewed />
        </Suspense>
        <TrustIndicators />
        <Newsletter />
      </main>
    </div>
  );
};

export default HomePage;