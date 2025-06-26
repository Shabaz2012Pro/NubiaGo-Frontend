
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import { createTestUser, signInTestUser, deleteTestUser } from '../utils/createTestUser';

const AuthTestPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const handleCreateTestUser = async () => {
    addTestResult('Creating test user...');
    const result = await createTestUser();
    if (result.success) {
      addTestResult('✅ Test user created successfully');
    } else {
      addTestResult(`❌ Failed to create test user: ${result.error}`);
    }
  };

  const handleSignInTestUser = async () => {
    addTestResult('Signing in test user...');
    const result = await signInTestUser();
    if (result.success) {
      addTestResult('✅ Test user signed in successfully');
    } else {
      addTestResult(`❌ Failed to sign in test user: ${result.error}`);
    }
  };

  const handleDeleteTestUser = async () => {
    addTestResult('Deleting test user...');
    const result = await deleteTestUser();
    if (result.success) {
      addTestResult('✅ Test user deleted successfully');
    } else {
      addTestResult(`❌ Failed to delete test user: ${result.error}`);
    }
  };

  const handleLogout = async () => {
    addTestResult('Logging out...');
    try {
      await logout();
      addTestResult('✅ Logged out successfully');
    } catch (error) {
      addTestResult(`❌ Logout failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Authentication Test Page
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Test the authentication system functionality
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Auth Status */}
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Current Authentication Status
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Authenticated:</span>
                    <span className={`font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
                      {isAuthenticated ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                  
                  {user && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">User ID:</span>
                        <span className="font-mono text-sm">{user.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Email:</span>
                        <span className="font-medium">{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Email Verified:</span>
                        <span className={`font-medium ${user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}`}>
                          {user.email_confirmed_at ? '✅ Yes' : '⏳ Pending'}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {isAuthenticated && (
                  <div className="mt-6">
                    <Button
                      variant="secondary"
                      onClick={handleLogout}
                      fullWidth
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </Card>

              {/* Test Actions */}
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Test Actions
                </h2>
                
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    onClick={handleCreateTestUser}
                    fullWidth
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Test User
                  </Button>
                  
                  <Button
                    variant="primary"
                    onClick={handleSignInTestUser}
                    fullWidth
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Sign In Test User
                  </Button>
                  
                  <Button
                    variant="secondary"
                    onClick={handleDeleteTestUser}
                    fullWidth
                  >
                    Delete Test User
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => window.location.hash = '#auth?action=login'}
                      size="sm"
                    >
                      Go to Login
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => window.location.hash = '#auth?action=register'}
                      size="sm"
                    >
                      Go to Register
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Test User Credentials:</strong><br />
                    Email: test@nubiago.com<br />
                    Password: TestPassword123!
                  </p>
                </div>
              </Card>
            </div>

            {/* Test Results */}
            <Card variant="default" padding="lg" className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Test Results
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearResults}
                >
                  Clear
                </Button>
              </div>
              
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 min-h-32 max-h-64 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-neutral-500 dark:text-neutral-400 italic">
                    No test results yet. Run some tests above to see results here.
                  </p>
                ) : (
                  <div className="space-y-1">
                    {testResults.map((result, index) => (
                      <div key={index} className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthTestPage;
