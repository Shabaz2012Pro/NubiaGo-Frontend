import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface CategoryFilterProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selectedIds: string[]) => void;
  collapsible?: boolean;
  initialCollapsed?: boolean;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  title,
  options,
  selectedOptions,
  onChange,
  collapsible = true,
  initialCollapsed = false,
  className
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleOption = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      onChange(selectedOptions.filter(id => id !== optionId));
    } else {
      onChange([...selectedOptions, optionId]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card variant="default" padding="md" className={className}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedOptions.length > 0 && (
            <button 
              onClick={clearAll}
              className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Clear
            </button>
          )}
          
          {collapsible && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {selectedOptions.map(optionId => {
            const option = options.find(o => o.id === optionId);
            if (!option) return null;
            
            return (
              <Badge 
                key={optionId} 
                variant="primary" 
                size="sm"
                className="cursor-pointer flex items-center"
              >
                {option.label}
                <button 
                  onClick={() => toggleOption(optionId)}
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
      
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {options.length > 8 && (
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-neutral-800"
                />
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto pr-1 space-y-1">
              {filteredOptions.map(option => (
                <div key={option.id} className="flex items-center">
                  <label className="flex items-center space-x-2 py-1 px-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => toggleOption(option.id)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300 flex-1">
                      {option.label}
                    </span>
                    {option.count !== undefined && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        ({option.count})
                      </span>
                    )}
                  </label>
                </div>
              ))}
              
              {filteredOptions.length === 0 && (
                <div className="text-sm text-neutral-500 dark:text-neutral-400 py-2 text-center">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default CategoryFilter;