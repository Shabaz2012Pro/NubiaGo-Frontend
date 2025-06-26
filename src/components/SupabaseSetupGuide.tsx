import React from 'react';
import Card from './atoms/Card';
import Button from './atoms/Button';
import Badge from './atoms/Badge';
import { Database, Key, CheckCircle, AlertCircle, Code, ExternalLink, FileText, Terminal } from 'lucide-react';

const SupabaseSetupGuide: React.FC = () => {
  return (
    <Card variant="default" padding="lg" className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Supabase Setup Guide
        </h2>
      </div>

      <div className="space-y-6">
        <p className="text-neutral-600 dark:text-neutral-400">
          Follow these steps to set up Supabase for your NubiaGo project:
        </p>

        <div className="space-y-6">
          <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              1
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Create a Supabase Account
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">
              If you don't already have a Supabase account, sign up for free at supabase.com.
            </p>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ExternalLink className="w-4 h-4" />}
              onClick={() => window.open('https://supabase.com/dashboard/sign-up', '_blank')}
            >
              Sign Up for Supabase
            </Button>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              2
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Create a New Project
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">
              From the Supabase dashboard, create a new project and give it a name (e.g., "nubiago").
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300 mb-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Make sure to save your database password during project creation. You'll need it for admin access.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ExternalLink className="w-4 h-4" />}
              onClick={() => window.open('https://supabase.com/dashboard/projects', '_blank')}
            >
              Go to Projects Dashboard
            </Button>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              3
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Get API Keys
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">
              In your project settings, find your API URL and anon key under "API" in the sidebar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Database className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">URL</span>
                </div>
                <div className="text-xs text-neutral-500 font-mono truncate">
                  https://xxxxxxxxxxxx.supabase.co
                </div>
              </div>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Key className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Anon Key</span>
                </div>
                <div className="text-xs text-neutral-500 font-mono truncate">
                  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Key className="w-4 h-4" />}
              onClick={() => window.open('https://supabase.com/dashboard/project/_/settings/api', '_blank')}
            >
              View API Settings
            </Button>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              4
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Configure Environment Variables
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">
              Add your Supabase URL and anon key to your .env file:
            </p>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg mb-3">
              <pre className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
                <code>
                  VITE_SUPABASE_URL=https://your-project-id.supabase.co{'\n'}
                  VITE_SUPABASE_ANON_KEY=your-anon-key
                </code>
              </pre>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="success" size="sm" className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>Already configured in this project</span>
              </Badge>
            </div>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              5
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Run Migrations
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">
              Apply the database migrations to set up your schema:
            </p>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg mb-3">
              <div className="flex items-center space-x-2 mb-2">
                <Terminal className="w-4 h-4 text-neutral-500" />
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Run migrations</span>
              </div>
              <pre className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
                <code>
                  npx supabase link --project-ref your-project-ref{'\n'}
                  npx supabase migration up
                </code>
              </pre>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FileText className="w-4 h-4" />}
              onClick={() => window.open('https://supabase.com/docs/guides/cli/local-development#apply-migrations', '_blank')}
            >
              Migration Documentation
            </Button>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              6
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Test the Connection
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">
              Use the connection test tool to verify that your application can connect to Supabase:
            </p>
            <Button
              variant="primary"
              leftIcon={<Database className="w-4 h-4" />}
              onClick={() => window.location.href = '/supabase-test'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Connection Test
            </Button>
          </div>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-300">
                Ready to Use Supabase
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                Your NubiaGo project is already configured to use Supabase. You can start using the Supabase client in your components.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Additional Resources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Code className="w-4 h-4" />}
              onClick={() => window.open('https://supabase.com/docs', '_blank')}
              className="justify-start"
            >
              Supabase Documentation
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Code className="w-4 h-4" />}
              onClick={() => window.open('https://supabase.com/docs/reference/javascript/introduction', '_blank')}
              className="justify-start"
            >
              JavaScript Client Reference
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Code className="w-4 h-4" />}
              onClick={() => window.open('https://supabase.com/docs/guides/auth', '_blank')}
              className="justify-start"
            >
              Authentication Guide
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Code className="w-4 h-4" />}
              onClick={() => window.open('https://supabase.com/docs/guides/database', '_blank')}
              className="justify-start"
            >
              Database Guide
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SupabaseSetupGuide;