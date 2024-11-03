import React, { useState, useMemo } from 'react';

interface Option {
  value: string;
  label: string;
  payload?: any; // Payload can hold any additional data
}

interface SearchMultiSelectProps {
  options: Option[];
  selectedItems: Option[];
  onSelect: (item: Option) => void;
  onRemove: (item: Option) => void;
}

const SearchMultiSelect: React.FC<SearchMultiSelectProps> = ({
  options,
  selectedItems,
  onSelect,
  onRemove,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Ensure options are distinct by value
  const distinctOptions = useMemo(() => {
    const uniqueOptions = new Map(options.map(option => [option.value, option]));
    return Array.from(uniqueOptions.values());
  }, [options]);

  const filteredOptions = useMemo(() => {
    return distinctOptions.filter(
      (option) =>
        option.label?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedItems.some(selected => selected.value === option.value)
    );
  }, [distinctOptions, searchTerm, selectedItems]);

  return (
    <div className="border border-borders-primary rounded-md p-4 w-full max-w-md relative">
      <div className="flex items-start mb-2">
        {/* Selected Items */}
        <div className="flex flex-wrap mr-2">
          {selectedItems.length === 0 ? (
            <div className="text-text-primary"></div>
          ) : (
            selectedItems.map((item) => (
              <span
                key={item.value}
                className="bg-primary-blue text-text-white rounded-full px-2 py-1 mr-2 mb-2 flex items-center shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                {item.label}
                <button
                  onClick={() => onRemove(item)}
                  className="ml-1 text-accent-gold hover:text-gold"
                >
                  &times;
                </button>
              </span>
            ))
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100px' }} // Adjust width here
          className="border border-borders-primary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue ml-auto shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
        />
      </div>

      {/* Options Dropdown */}
      {filteredOptions.length > 0 && (
        <div className="mt-2 max-h-40 overflow-hidden">
          <div
            className="w-full shadow-lg max-h-40 overflow-y-auto"
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For Internet Explorer and Edge
            }}
          >
            {/* Hide scrollbar for Chrome, Safari, and Opera */}
            <style>
              {`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => onSelect(option)}
                className="p-2 hover:bg-background-button cursor-pointer transition-colors duration-200 ease-in-out rounded-md"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMultiSelect;
