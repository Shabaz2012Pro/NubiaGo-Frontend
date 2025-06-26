
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw,
  Link as LinkIcon,
  Mouse,
  AlertTriangle
} from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { useLinkButtonChecker, LinkCheckResult, ButtonCheckResult } from '../../utils/linkButtonChecker';
import { clsx } from 'clsx';

interface LinkButtonCheckerProps {
  className?: string;
  onComplete?: (results: { brokenLinks: number; brokenButtons: number }) => void;
}

const LinkButtonChecker: React.FC<LinkButtonCheckerProps> = ({
  className,
  onComplete
}) => {
  const [activeTab, setActiveTab] = useState<'links' | 'buttons'>('links');
  const { isChecking, results, checkPage, brokenLinks, brokenButtons } = useLinkButtonChecker();

  const handleCheck = async () => {
    await checkPage();
    if (onComplete && results) {
      onComplete({
        brokenLinks: results.summary.brokenLinks,
        brokenButtons: results.summary.brokenButtons
      });
    }
  };

  const renderLinkItem = (link: LinkCheckResult) => (
    <div key={`${link.url}-${link.text}`} className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <LinkIcon className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium truncate">{link.text || 'No text'}</span>
            <Badge variant={link.type === 'external' ? 'warning' : 'neutral'} size="sm">
              {link.type}
            </Badge>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 truncate">
            {link.url}
          </p>
          {link.error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {link.error}
            </p>
          )}
        </div>
        <div className="ml-3">
          {link.isWorking ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
        </div>
      </div>
    </div>
  );

  const renderButtonItem = (button: ButtonCheckResult) => (
    <div key={button.id} className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Mouse className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium truncate">{button.text || button.id}</span>
            <Badge variant={button.type === 'submit' ? 'primary' : 'neutral'} size="sm">
              {button.type}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            <span>Click Handler: {button.hasClickHandler ? '✓' : '✗'}</span>
            {button.type === 'link' && (
              <span>Href: {button.hasHref ? '✓' : '✗'}</span>
            )}
          </div>
          {button.error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {button.error}
            </p>
          )}
        </div>
        <div className="ml-3">
          {button.isWorking ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className={clsx('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Link & Button Checker</h3>
        <Button 
          onClick={handleCheck} 
          disabled={isChecking}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={clsx('w-4 h-4', isChecking && 'animate-spin')} />
          <span>{isChecking ? 'Checking...' : 'Check Page'}</span>
        </Button>
      </div>

      {results && (
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{results.summary.totalLinks}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Links</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{results.summary.brokenLinks}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Broken Links</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{results.summary.totalButtons}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Buttons</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{results.summary.brokenButtons}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Broken Buttons</div>
            </Card>
          </div>
        </div>
      )}

      {results && (
        <>
          <div className="flex space-x-1 mb-4">
            <Button
              variant={activeTab === 'links' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('links')}
              className="flex items-center space-x-2"
            >
              <LinkIcon className="w-4 h-4" />
              <span>Links ({results.summary.totalLinks})</span>
              {results.summary.brokenLinks > 0 && (
                <Badge variant="danger" size="sm">{results.summary.brokenLinks}</Badge>
              )}
            </Button>
            <Button
              variant={activeTab === 'buttons' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('buttons')}
              className="flex items-center space-x-2"
            >
              <Mouse className="w-4 h-4" />
              <span>Buttons ({results.summary.totalButtons})</span>
              {results.summary.brokenButtons > 0 && (
                <Badge variant="danger" size="sm">{results.summary.brokenButtons}</Badge>
              )}
            </Button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'links' ? (
              <div className="space-y-3">
                {results.links.length === 0 ? (
                  <p className="text-center text-neutral-600 dark:text-neutral-400 py-8">
                    No links found on this page.
                  </p>
                ) : (
                  <>
                    {brokenLinks.length > 0 && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">
                              {brokenLinks.length} Broken Links Found
                            </h4>
                            <p className="text-sm text-red-600 dark:text-red-400">
                              These links may not work properly and should be fixed.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {results.links.map(renderLinkItem)}
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {results.buttons.length === 0 ? (
                  <p className="text-center text-neutral-600 dark:text-neutral-400 py-8">
                    No buttons found on this page.
                  </p>
                ) : (
                  <>
                    {brokenButtons.length > 0 && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">
                              {brokenButtons.length} Non-Working Buttons Found
                            </h4>
                            <p className="text-sm text-red-600 dark:text-red-400">
                              These buttons may not respond to user clicks.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {results.buttons.map(renderButtonItem)}
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}

      {!results && !isChecking && (
        <div className="text-center py-12">
          <LinkIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400">
            Click "Check Page" to scan for broken links and non-working buttons.
          </p>
        </div>
      )}
    </Card>
  );
};

export default LinkButtonChecker;
