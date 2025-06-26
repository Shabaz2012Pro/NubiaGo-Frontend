import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export interface AutoCompleteOption {
  value: string;
  label: string;
  category?: string;
  icon?: React.ReactNode;
  description?: string;
}

interface AutoCompleteProps {
  options: AutoCompleteOption[];
  value?: string;
  onChange?: (value: string, option?: AutoCompleteOption) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowCustom?: boolean;
  maxResults?: number;
  className?: string;
  onSearch?: (query: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  value = '',
  onChange,
  placeholder = 'Search...',
  disabled = false,
  loading = false,
  allowCustom = false,
  maxResults = 10,
  className,
  onSearch
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredOptions = options
    .filter(option => 
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.value.toLowerCase().includes(inputValue.toLowerCase())
    )
    .slice(0, maxResults);

  const groupedOptions = filteredOptions.reduce((groups, option) => {
    const category = option.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(option);
    return groups;
  }, {} as Record<string, AutoCompleteOption[]>);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    onSearch?.(inputValue);
  }, [inputValue, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    
    if (allowCustom) {
      onChange?.(newValue);
    }
  };

  const handleOptionSelect = (option: AutoCompleteOption) => {
    setInputValue(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange?.(option.value, option);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        } else if (allowCustom && inputValue.trim()) {
          onChange?.(inputValue.trim());
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearInput = () => {
    setInputValue('');
    setIsOpen(false);
    onChange?.('');
    inputRef.current?.focus();
  };

  return (
    <div className={clsx('relative', className)} ref={inputRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'w-full pl-10 pr-10 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg',
            'focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none',
            'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
            'transition-all duration-200',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {loading && (
            <div className="w-4 h-4 border-2 border-neutral-300 border-t-red-500 rounded-full animate-spin" />
          )}
          
          {inputValue && !loading && (
            <button
              onClick={clearInput}
              className="w-4 h-4 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <ChevronDown className={clsx(
            'w-4 h-4 text-neutral-400 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (filteredOptions.length > 0 || allowCustom) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl max-h-80 overflow-hidden"
          >
            <ul ref={listRef} className="max-h-80 overflow-y-auto">
              {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                <li key={category}>
                  {Object.keys(groupedOptions).length > 1 && (
                    <div className="px-3 py-2 text-xs font-medium text-neutral-500 bg-neutral-50 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
                      {category}
                    </div>
                  )}
                  
                  {categoryOptions.map((option, index) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect(option)}
                        className={clsx(
                          'w-full px-3 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors',
                          'flex items-center space-x-3',
                          globalIndex === highlightedIndex && 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        )}
                      >
                        {option.icon && (
                          <span className="text-neutral-400">{option.icon}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-sm text-neutral-500 truncate">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </li>
              ))}
              
              {allowCustom && inputValue.trim() && !filteredOptions.some(opt => opt.value === inputValue.trim()) && (
                <button
                  onClick={() => {
                    onChange?.(inputValue.trim());
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors border-t border-neutral-200 dark:border-neutral-600"
                >
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Use "{inputValue.trim()}"
                    </span>
                  </div>
                </button>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoComplete;