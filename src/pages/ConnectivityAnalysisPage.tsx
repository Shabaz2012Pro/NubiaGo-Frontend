import React, { useState } from 'react';
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
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import ConnectivityChecker from '../components/molecules/ConnectivityChecker';
import Breadcrumb from '../components/molecules/Breadcrumb';

const ConnectivityAnalysisPage: React.FC = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Tools', href: '#tools' },
    { label: 'Connectivity Analysis', current: true }
  ];
  
  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
  };
  
  const generateReport = () => {
    if (!analysisResults) return;
    
    setIsGeneratingReport(true);
    
    // Create report content
    const reportContent = `
# NubiaGo Page Connectivity Analysis Report
Generated: ${new Date().toLocaleString()}

## Summary
- Links: ${analysisResults.links.valid}/${analysisResults.links.total} valid
- Routes: ${analysisResults.routes.valid}/${analysisResults.routes.total} valid
- Buttons: ${analysisResults.buttons.valid}/${analysisResults.buttons.total} valid
- Forms: ${analysisResults.forms.valid}/${analysisResults.forms.total} valid

## Invalid Links
${analysisResults.links.items
  .filter((link: any) => !link.isValid)
  .map((link: any) => `- ${link.url}: ${link.error}`)
  .join('\n')}

## Invalid Routes
${analysisResults.routes.items
  .filter((route: any) => !route.exists)
  .map((route: any) => `- ${route.path}: ${route.error}`)
  .join('\n')}

## Problematic Buttons
${analysisResults.buttons.items
  .filter((button: any) => button.error)
  .map((button: any) => `- ${button.text || button.id}: ${button.error}`)
  .join('\n')}

## Problematic Forms
${analysisResults.forms.items
  .filter((form: any) => form.error)
  .map((form: any) => `- ${form.text || form.id}: ${form.error}`)
  .join('\n')}
`;
    
    // Create a blob and download link
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nubiago-connectivity-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsGeneratingReport(false);
  };
  
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Page Connectivity Analysis
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
                Analyze and validate links, routes, buttons, and forms on the current page to ensure all connections are working properly.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-8">
              <ConnectivityChecker onComplete={handleAnalysisComplete} />
            </motion.div>
            
            {analysisResults && (
              <motion.div variants={itemVariants}>
                <Card variant="default" padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                      Analysis Summary
                    </h2>
                    <Button
                      variant="outline"
                      onClick={generateReport}
                      loading={isGeneratingReport}
                      leftIcon={<Download className="w-4 h-4" />}
                    >
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Overall Health Score */}
                    <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Page Health Score
                      </h3>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center">
                          <span className="text-3xl font-bold text-green-600">
                            {Math.round(
                              ((analysisResults.links.valid + analysisResults.routes.valid + 
                                analysisResults.buttons.valid + analysisResults.forms.valid) /
                               (analysisResults.links.total + analysisResults.routes.total + 
                                analysisResults.buttons.total + analysisResults.forms.total)) * 100
                            )}%
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Links</span>
                                <span>{Math.round((analysisResults.links.valid / analysisResults.links.total) * 100)}%</span>
                              </div>
                              <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full" 
                                  style={{ width: `${(analysisResults.links.valid / analysisResults.links.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Routes</span>
                                <span>{Math.round((analysisResults.routes.valid / analysisResults.routes.total) * 100)}%</span>
                              </div>
                              <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500 rounded-full" 
                                  style={{ width: `${(analysisResults.routes.valid / analysisResults.routes.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Buttons</span>
                                <span>{Math.round((analysisResults.buttons.valid / analysisResults.buttons.total) * 100)}%</span>
                              </div>
                              <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-500 rounded-full" 
                                  style={{ width: `${(analysisResults.buttons.valid / analysisResults.buttons.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Forms</span>
                                <span>{Math.round((analysisResults.forms.valid / analysisResults.forms.total) * 100)}%</span>
                              </div>
                              <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-orange-500 rounded-full" 
                                  style={{ width: `${(analysisResults.forms.valid / analysisResults.forms.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recommendations */}
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                            Recommendations
                          </h3>
                          <ul className="space-y-2 text-blue-600 dark:text-blue-400">
                            {analysisResults.links.invalid > 0 && (
                              <li className="flex items-start">
                                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Fix {analysisResults.links.invalid} invalid links to improve navigation and SEO.</span>
                              </li>
                            )}
                            {analysisResults.routes.invalid > 0 && (
                              <li className="flex items-start">
                                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Update {analysisResults.routes.invalid} invalid routes to prevent 404 errors.</span>
                              </li>
                            )}
                            {analysisResults.buttons.invalid > 0 && (
                              <li className="flex items-start">
                                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Fix {analysisResults.buttons.invalid} problematic buttons to improve user interaction.</span>
                              </li>
                            )}
                            {analysisResults.forms.invalid > 0 && (
                              <li className="flex items-start">
                                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Address {analysisResults.forms.invalid} form issues to ensure proper submission.</span>
                              </li>
                            )}
                            {analysisResults.links.invalid === 0 && 
                             analysisResults.routes.invalid === 0 && 
                             analysisResults.buttons.invalid === 0 && 
                             analysisResults.forms.invalid === 0 && (
                              <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>All connections are working properly! No issues found.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConnectivityAnalysisPage;