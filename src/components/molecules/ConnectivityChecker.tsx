import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Link, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw,
  ArrowRight,
  Search,
  FileText,
  Download,
  Zap
} from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { useLinkChecker } from '../../utils/linkChecker';
import { useRouteChecker } from '../../utils/routeChecker';
import { useButtonChecker, useFormSubmitChecker } from '../../utils/buttonChecker';
import { clsx } from 'clsx';

interface ConnectivityCheckerProps {
  className?: string;
  onComplete?: (results: any) => void;
}

const ConnectivityChecker: React.FC<ConnectivityCheckerProps> = ({
  className,
  onComplete
}) => {
  const [activeTab, setActiveTab] = useState<'links' | 'routes' | 'buttons' | 'forms'>('links');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>({
    links: { total: 0, valid: 0, invalid: 0, items: [] },
    routes: { total: 0, valid: 0, invalid: 0, items: [] },
    buttons: { total: 0, valid: 0, invalid: 0, items: [] },
    forms: { total: 0, valid: 0, invalid: 0, items: [] }
  });

  // Link checker
  const { 
    linkStatuses, 
    invalidLinks, 
    isChecking: isCheckingLinks, 
    checkLinks 
  } = useLinkChecker();

  // Route checker
  const { 
    routeStatuses, 
    invalidRoutes, 
    isChecking: isCheckingRoutes, 
    checkRoutes 
  } = useRouteChecker();

  // Button checker
  const { 
    buttonStatuses, 
    problematicButtons, 
    isChecking: isCheckingButtons, 
    checkButtons 
  } = useButtonChecker();

  // Form submit checker
  const { 
    submitButtons, 
    problematicForms, 
    isChecking: isCheckingForms, 
    checkForms 
  } = useFormSubmitChecker();

  // Run all checks
  const runAllChecks = async () => {
    setIsChecking(true);

    // Run all checks in parallel
    const [linkResults, routeResults, buttonResults, formResults] = await Promise.all([
      checkLinks(),
      checkRoutes(),
      checkButtons(),
      checkForms()
    ]);

    // Update results
    const newResults = {
      links: {
        total: linkResults.length,
        valid: linkResults.filter(link => link.isValid).length,
        invalid: linkResults.filter(link => !link.isValid).length,
        items: linkResults
      },
      routes: {
        total: routeResults.length,
        valid: routeResults.filter(route => route.exists).length,
        invalid: routeResults.filter(route => !route.exists).length,
        items: routeResults
      },
      buttons: {
        total: buttonResults.length,
        valid: buttonResults.filter(button => !button.error).length,
        invalid: buttonResults.filter(button => button.error).length,
        items: buttonResults
      },
      forms: {
        total: formResults.length,
        valid: formResults.filter(form => !form.error).length,
        invalid: formResults.filter(form => form.error).length,
        items: formResults
      }
    };

    setResults(newResults);
    setIsChecking(false);

    if (onComplete) {
      onComplete(newResults);
    }
  };

  // Run checks when the component mounts
  useEffect(() => {
    runAllChecks();
  }, []);

  return (
    <Card variant="default" padding="lg" className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Page Connectivity Checker
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Analyze and validate links, routes, buttons, and forms on the current page.
        </p>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Link className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Links</span>
            </div>
            <div className="text-2xl font-bold">
              {results.links.valid}/{results.links.total}
            </div>
            {results.links.invalid > 0 && (
              <Badge variant="error" size="sm">{results.links.invalid} issues</Badge>
            )}
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <ArrowRight className="w-5 h-5 text-green-500" />
              <span className="font-medium">Routes</span>
            </div>
            <div className="text-2xl font-bold">
              {results.routes.valid}/{results.routes.total}
            </div>
            {results.routes.invalid > 0 && (
              <Badge variant="error" size="sm">{results.routes.invalid} issues</Badge>
            )}
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-5 h-5 flex items-center justify-center text-purple-500">
                <span className="text-lg font-bold">B</span>
              </div>
              <span className="font-medium">Buttons</span>
            </div>
            <div className="text-2xl font-bold">
              {results.buttons.valid}/{results.buttons.total}
            </div>
            {results.buttons.invalid > 0 && (
              <Badge variant="error" size="sm">{results.buttons.invalid} issues</Badge>
            )}
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-5 h-5 flex items-center justify-center text-orange-500">
                <span className="text-lg font-bold">F</span>
              </div>
              <span className="font-medium">Forms</span>
            </div>
            <div className="text-2xl font-bold">
              {results.forms.valid}/{results.forms.total}
            </div>
            {results.forms.invalid > 0 && (
              <Badge variant="error" size="sm">{results.forms.invalid} issues</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === 'links' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('links')}
          leftIcon={<Link className="w-4 h-4" />}
        >
          Links
        </Button>
        <Button
          variant={activeTab === 'routes' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('routes')}
          leftIcon={<ArrowRight className="w-4 h-4" />}
        >
          Routes
        </Button>
        <Button
          variant={activeTab === 'buttons' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('buttons')}
        >
          Buttons
        </Button>
        <Button
          variant={activeTab === 'forms' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('forms')}
        >
          Forms
        </Button>
      </div>

      {/* Links Tab */}
      {activeTab === 'links' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              Link Analysis
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={checkLinks}
              loading={isCheckingLinks}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
          </div>

          {linkStatuses.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400">
                No links found on this page.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {invalidLinks.length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">
                        {invalidLinks.length} Invalid Links Found
                      </h4>
                      <ul className="space-y-1 text-sm text-red-600 dark:text-red-400">
                        {invalidLinks.slice(0, 3).map((link, index) => (
                          <li key={index}>• {link.url} - {link.error}</li>
                        ))}
                        {invalidLinks.length > 3 && (
                          <li>• ...and {invalidLinks.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-700">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800">
                      <th className="px-4 py-2 text-left">URL</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linkStatuses.map((link, index) => (
                      <tr 
                        key={index} 
                        className={clsx(
                          index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                          !link.isValid && 'bg-red-50 dark:bg-red-900/10'
                        )}
                      >
                        <td className="px-4 py-2 font-mono text-sm truncate max-w-xs">
                          {link.url}
                        </td>
                        <td className="px-4 py-2">
                          <Badge 
                            variant={link.type === 'internal' ? 'primary' : link.type === 'external' ? 'gold' : 'default'} 
                            size="sm"
                          >
                            {link.type === 'internal' ? 'Internal' : link.type === 'external' ? 'External' : 'Anchor'}
                          </Badge>
                        </td>
                        <td className="px-4 py-2">
                          {link.isValid ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span>Valid</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span>{link.error}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Routes Tab */}
      {activeTab === 'routes' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              Route Analysis
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={checkRoutes}
              loading={isCheckingRoutes}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
          </div>

          {routeStatuses.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400">
                No routes found on this page.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {invalidRoutes.length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">
                        {invalidRoutes.length} Invalid Routes Found
                      </h4>
                      <ul className="space-y-1 text-sm text-red-600 dark:text-red-400">
                        {invalidRoutes.slice(0, 3).map((route, index) => (
                          <li key={index}>• {route.path} - {route.error}</li>
                        ))}
                        {invalidRoutes.length > 3 && (
                          <li>• ...and {invalidRoutes.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-700">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800">
                      <th className="px-4 py-2 text-left">Path</th>
                      <th className="px-4 py-2 text-left">Component</th>
                      <th className="px-4 py-2 text-left">Protected</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routeStatuses.map((route, index) => (
                      <tr 
                        key={index} 
                        className={clsx(
                          index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                          !route.exists && 'bg-red-50 dark:bg-red-900/10'
                        )}
                      >
                        <td className="px-4 py-2 font-mono text-sm">
                          {route.path}
                        </td>
                        <td className="px-4 py-2">
                          {route.component || 'N/A'}
                        </td>
                        <td className="px-4 py-2">
                          {route.isProtected ? (
                            <Badge variant="warning" size="sm">Protected</Badge>
                          ) : (
                            <Badge variant="success" size="sm">Public</Badge>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {route.exists ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span>Valid</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span>{route.error}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Buttons Tab */}
      {activeTab === 'buttons' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              Button Analysis
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={checkButtons}
              loading={isCheckingButtons}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
          </div>

          {buttonStatuses.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400">
                No buttons found on this page.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {problematicButtons.length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">
                        {problematicButtons.length} Problematic Buttons Found
                      </h4>
                      <ul className="space-y-1 text-sm text-red-600 dark:text-red-400">
                        {problematicButtons.slice(0, 3).map((button, index) => (
                          <li key={index}>• {button.text || button.id} - {button.error}</li>
                        ))}
                        {problematicButtons.length > 3 && (
                          <li>• ...and {problematicButtons.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-700">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800">
                      <th className="px-4 py-2 text-left">Button</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Disabled</th>
                      <th className="px-4 py-2 text-left">Click Handler</th>
                      <th className="px-4 py-2 text-left">Accessible</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buttonStatuses.map((button, index) => (
                      <tr 
                        key={index} 
                        className={clsx(
                          index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                          button.error && 'bg-red-50 dark:bg-red-900/10'
                        )}
                      >
                        <td className="px-4 py-2">
                          {button.text || button.id}
                        </td>
                        <td className="px-4 py-2">
                          <Badge 
                            variant={
                              button.type === 'submit' ? 'success' : 
                              button.type === 'reset' ? 'warning' : 
                              button.type === 'link' ? 'gold' : 'primary'
                            } 
                            size="sm"
                          >
                            {button.type}
                          </Badge>
                        </td>
                        <td className="px-4 py-2">
                          {button.isDisabled ? 'Yes' : 'No'}
                        </td>
                        <td className="px-4 py-2">
                          {button.hasClickHandler ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {button.isAccessible ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {button.error ? (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span>{button.error}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span>Valid</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Forms Tab */}
      {activeTab === 'forms' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              Form Submission Analysis
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={checkForms}
              loading={isCheckingForms}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
          </div>

          {submitButtons.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400">
                No forms found on this page.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {problematicForms.length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">
                        {problematicForms.length} Problematic Forms Found
                      </h4>
                      <ul className="space-y-1 text-sm text-red-600 dark:text-red-400">
                        {problematicForms.slice(0, 3).map((form, index) => (
                          <li key={index}>• {form.text || form.id} - {form.error}</li>
                        ))}
                        {problematicForms.length > 3 && (
                          <li>• ...and {problematicForms.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-700">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800">
                      <th className="px-4 py-2 text-left">Form</th>
                      <th className="px-4 py-2 text-left">Submit Button</th>
                      <th className="px-4 py-2 text-left">Disabled</th>
                      <th className="px-4 py-2 text-left">Accessible</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submitButtons.map((button, index) => (
                      <tr 
                        key={index} 
                        className={clsx(
                          index % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50',
                          button.error && 'bg-red-50 dark:bg-red-900/10'
                        )}
                      >
                        <td className="px-4 py-2">
                          {button.id.startsWith('form-') ? button.id : `Form ${index + 1}`}
                        </td>
                        <td className="px-4 py-2">
                          {button.text || 'No text'}
                        </td>
                        <td className="px-4 py-2">
                          {button.isDisabled ? 'Yes' : 'No'}
                        </td>
                        <td className="px-4 py-2">
                          {button.isAccessible ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {button.error ? (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span>{button.error}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span>Valid</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Run All Button */}
      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <Button
          variant="primary"
          onClick={runAllChecks}
          loading={isChecking}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Run All Checks
        </Button>
      </div>
    </Card>
  );
};

export default ConnectivityChecker;