
import React, { useState, useEffect } from 'react';
import { testSupabaseConnection } from '../utils/supabaseTest';
import { productsApi, categoriesApi } from '../api/supabaseApi';
import { Button } from '../components/atoms/Button';
import { Card } from '../components/atoms/Card';

const DatabaseTestPage: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const runConnectionTest = async () => {
    setLoading(true);
    const result = await testSupabaseConnection();
    setConnectionStatus(result);
    setLoading(false);
  };

  const loadSampleData = async () => {
    setLoading(true);
    try {
      // Load categories
      const categoriesResult = await categoriesApi.getCategories();
      setCategories(categoriesResult);

      // Load products
      const productsResult = await productsApi.searchProducts('', { limit: 5 });
      setProducts(productsResult.products);
    } catch (error) {
      console.error('Error loading sample data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    runConnectionTest();
    loadSampleData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Connection Test</h1>
        
        {/* Connection Status */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Button onClick={runConnectionTest} disabled={loading}>
                {loading ? 'Testing...' : 'Test Connection'}
              </Button>
              {connectionStatus && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  connectionStatus.success 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {connectionStatus.success ? '✅ Connected' : '❌ Failed'}
                </div>
              )}
            </div>
            
            {connectionStatus && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(connectionStatus, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>

        {/* Sample Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Categories */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Categories ({categories.length})</h2>
              <Button onClick={loadSampleData} disabled={loading} className="mb-4">
                Reload Data
              </Button>
              <div className="space-y-2 max-h-64 overflow-auto">
                {categories.map((category) => (
                  <div key={category.id} className="p-2 bg-gray-50 rounded">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-600">{category.slug}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Products */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
              <div className="space-y-2 max-h-64 overflow-auto">
                {products.map((product) => (
                  <div key={product.id} className="p-2 bg-gray-50 rounded">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">${product.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Environment Info */}
        <Card className="mt-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Environment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Supabase URL:</span>
                <div className="text-gray-600 break-all">
                  {import.meta.env.VITE_SUPABASE_URL}
                </div>
              </div>
              <div>
                <span className="font-medium">Mock Mode:</span>
                <div className="text-gray-600">
                  {import.meta.env.VITE_USE_MOCK_DATA === 'true' ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseTestPage;
