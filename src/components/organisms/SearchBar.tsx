import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, X, Mic, Camera, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { useProductStore } from '../../store/useProductStore';

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onBlur?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search products...",
  className = "",
  autoFocus = false,
  onBlur
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { searchProducts } = useProductStore();

  const debouncedQuery = useDebounce(query, 300);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSearches = localStorage.getItem('recentSearches');
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    }
  }, []);

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        searchProducts(searchQuery)
          .then(() => {
            setIsLoading(false);
            setIsOpen(false);
            // Update recent searches
            setRecentSearches((prevSearches) => {
              const newSearches = [
                searchQuery,
                ...prevSearches.filter((search) => search !== searchQuery),
              ].slice(0, 5); // Limit to 5 recent searches

              return newSearches;
            });
            navigate(`/search?q=${searchQuery}`);
          })
          .catch((error) => {
            console.error('Search error:', error);
            setIsLoading(false);
          });
      }
    },
    [searchProducts, navigate]
  );

  useEffect(() => {
    if (debouncedQuery) {
      // Simulate fetching suggestions from an API
      const fetchSuggestions = async () => {
        // Replace this with your actual API endpoint
        const dummySuggestions = [
          `${debouncedQuery} electronics`,
          `${debouncedQuery} clothing`,
          `${debouncedQuery} home decor`,
        ];

        setSuggestions(dummySuggestions);
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
  };

  const handleVoiceSearch = () => {
    // Implement voice search logic here
    console.log('Voice search clicked');
  };

  const handleCameraSearch = () => {
    // Implement camera search logic here
    console.log('Camera search clicked');
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={onBlur}
          autoFocus={autoFocus}
          className={`w-full pl-12 pr-20 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        {query && (
          <button
            className="absolute inset-y-0 right-16 pr-3 flex items-center focus:outline-none cursor-pointer"
            onClick={handleClear}
          >
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        )}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
          <button
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={handleVoiceSearch}
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={handleCameraSearch}
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-10">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSearch(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : query ? (
            <div className="px-4 py-2 text-gray-500">No suggestions found.</div>
          ) : (
            <div>
              {recentSearches.length > 0 && (
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-semibold">Recent Searches</span>
                  </div>
                  <ul>
                    {recentSearches.map((search, index) => (
                      <li
                        key={index}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                        onClick={() => handleSearch(search)}
                      >
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{search}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;