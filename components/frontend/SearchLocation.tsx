import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';

interface SearchLocationProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

interface LocationSuggestion {
  id: string;
  name: string;
  type: 'location' | 'activity';
  description?: string;
  isRecent?: boolean;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ 
  value, 
  onChange, 
  onClose 
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for suggestions
  const mockSuggestions: LocationSuggestion[] = [
    { id: '1', name: 'Paris, France', type: 'location', description: 'City of Light' },
    { id: '2', name: 'Tokyo, Japan', type: 'location', description: 'Modern metropolis' },
    { id: '3', name: 'New York, USA', type: 'location', description: 'The Big Apple' },
    { id: '4', name: 'London, UK', type: 'location', description: 'Historic capital' },
    { id: '5', name: 'Rome, Italy', type: 'location', description: 'Eternal City' },
    { id: '6', name: 'Bali, Indonesia', type: 'location', description: 'Tropical paradise' },
    { id: '7', name: 'Barcelona, Spain', type: 'location', description: 'Mediterranean beauty' },
    { id: '8', name: 'Amsterdam, Netherlands', type: 'location', description: 'Canal city' },
  ];

  const recentSearches: LocationSuggestion[] = [
    { id: 'r1', name: 'Nearby', type: 'location', isRecent: true },
    { id: 'r2', name: 'Paris, France', type: 'location', isRecent: true },
    { id: 'r3', name: 'London, UK', type: 'location', isRecent: true },
  ];

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions(recentSearches);
    } else {
      setIsLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter(suggestion =>
          suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    onChange(suggestion.name);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
      {/* Search input */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for a place or activity"
            className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Suggestions list */}
      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
            <p className="mt-2">Searching...</p>
          </div>
        ) : suggestions.length > 0 ? (
          <div className="py-2">
            {searchTerm.trim() === '' && (
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Recent Searches
              </div>
            )}
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 group"
              >
                <div className="flex-shrink-0">
                  {suggestion.isRecent ? (
                    <Clock className="h-4 w-4 text-gray-400 group-hover:text-emerald-600" />
                  ) : (
                    <MapPin className="h-4 w-4 text-gray-400 group-hover:text-emerald-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 group-hover:text-emerald-700 truncate">
                    {suggestion.name}
                  </div>
                  {suggestion.description && (
                    <div className="text-sm text-gray-500 truncate">
                      {suggestion.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : searchTerm.trim() !== '' ? (
          <div className="p-4 text-center text-gray-500">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>No results found</p>
            <p className="text-sm mt-1">Try searching for a different location</p>
          </div>
        ) : null}
      </div>

      {/* Popular destinations */}
      {searchTerm.trim() === '' && (
        <div className="border-t border-gray-100 p-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Popular Destinations
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Paris', 'Tokyo', 'New York', 'London', 'Rome'].map((city) => (
              <button
                key={city}
                onClick={() => handleSuggestionClick({ id: city, name: city, type: 'location' })}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchLocation;