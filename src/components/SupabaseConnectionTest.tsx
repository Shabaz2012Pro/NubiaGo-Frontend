import React, { useState } from 'react';
import { testSupabaseConnection, fetchSupabaseData } from '../utils/supabaseTest';
import Card from './atoms/Card';
import Button from './atoms/Button';
import Badge from './atoms/Badge';
import { Database, RefreshCw, CheckCircle, XCircle, Table } from 'lucide-react';

const SupabaseConnectionTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);
  const [dataResult, setDataResult] = useState<{
    success: boolean;
    data?: any;
    error?: string;
  } | null>(null);

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const result = await testSupabaseConnection();
      setTestResult({
        success: result.success,
        message: result.success 
          ? 'Connection successful! Supabase is properly configured.' 
          : `Connection failed: ${result.error}`,
        data: result.data
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `Error testing connection: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchSupabaseData();
      setDataResult(result);
    } catch (error) {
      setDataResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="default" padding="lg" className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Supabase Connection Test
        </h2>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              Test Database Connection
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Verify that your application can connect to Supabase
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleTestConnection}
            loading={isLoading}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Test Connection
          </Button>
        </div>

        {testResult && (
          <div className={`p-4 rounded-lg ${testResult.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            <div className="flex items-start space-x-3">
              {testResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${testResult.success ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                  {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                </p>
                <p className={`text-sm ${testResult.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {testResult.message}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Fetch Sample Data
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Retrieve sample data from your Supabase database
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleFetchData}
              loading={isLoading}
              leftIcon={<Table className="w-4 h-4" />}
              disabled={!testResult?.success}
            >
              Fetch Data
            </Button>
          </div>

          {dataResult && (
            <div className="mt-4">
              {dataResult.success ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">
                          Data Fetched Successfully
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="success" size="sm">
                            {dataResult.data?.products?.length || 0} Products
                          </Badge>
                          <Badge variant="success" size="sm">
                            {dataResult.data?.profiles?.length || 0} Profiles
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sample data preview */}
                  {dataResult.data?.products?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                        Sample Products
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                          <thead className="bg-neutral-50 dark:bg-neutral-800">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">ID</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Name</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Price</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Category</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                            {dataResult.data.products.slice(0, 3).map((product: any) => (
                              <tr key={product.id}>
                                <td className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400">{product.id.substring(0, 8)}...</td>
                                <td className="px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">{product.name}</td>
                                <td className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400">${product.price}</td>
                                <td className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400">{product.category}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-300">
                        Failed to Fetch Data
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        {dataResult.error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SupabaseConnectionTest;