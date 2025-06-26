import React from 'react';
import SupabaseConnectionTest from '../components/SupabaseConnectionTest';
import { supabase } from '../api/supabaseClient';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import { Database, Key, Lock, User, Settings, Table, Code } from 'lucide-react';

const SupabaseTestPage: React.FC = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Supabase Connection Test
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              This page helps you verify that your NubiaGo application is properly connected to Supabase.
            </p>
          </div>

          <SupabaseConnectionTest />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card variant="default" padding="lg">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Configuration
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Database className="w-4 h-4 text-neutral-500" />
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      Supabase URL
                    </h3>
                  </div>
                  <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg text-sm font-mono break-all">
                    {supabaseUrl || 'Not configured'}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Key className="w-4 h-4 text-neutral-500" />
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      Anon Key
                    </h3>
                  </div>
                  <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg text-sm font-mono break-all">
                    {supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Not configured'}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Lock className="w-4 h-4" />}
                    onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                  >
                    Open Supabase Dashboard
                  </Button>
                </div>
              </div>
            </Card>

            <Card variant="default" padding="lg">
              <div className="flex items-center space-x-3 mb-6">
                <Code className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Available Tables
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Table className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">products</span>
                    </div>
                    <Badge variant="success" size="sm" className="mt-2">Available</Badge>
                  </div>

                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">profiles</span>
                    </div>
                    <Badge variant="success" size="sm" className="mt-2">Available</Badge>
                  </div>

                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Table className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">categories</span>
                    </div>
                    <Badge variant="success" size="sm" className="mt-2">Available</Badge>
                  </div>

                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Table className="w-4 h-4 text-amber-600" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">orders</span>
                    </div>
                    <Badge variant="success" size="sm" className="mt-2">Available</Badge>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Table className="w-4 h-4" />}
                    onClick={() => window.open('https://supabase.com/dashboard/project/_/editor', '_blank')}
                  >
                    View Database Tables
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <Card variant="default" padding="lg">
            <div className="flex items-center space-x-3 mb-6">
              <Code className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Supabase Client Usage Example
              </h2>
            </div>

            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono">
                <code className="language-typescript">
{`// Example of using Supabase client in your code
import { supabase } from '../api/supabaseClient';

// Fetch products
const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(10);
    
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data;
};

// Create a new profile
const createProfile = async (userId, userData) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      { 
        id: userId,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email
      }
    ])
    .select();
    
  if (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
  
  return data;
};

// Authentication example
const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }
  
  return data;
};`}
                </code>
              </pre>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SupabaseTestPage;