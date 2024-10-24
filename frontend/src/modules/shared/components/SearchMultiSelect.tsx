import React, { useState, useMemo } from 'react';

interface SearchMultiSelectProps {
  options: string[];
  selectedItems: string[];
  onSelect: (item: string) => void;
  onRemove: (item: string) => void;
}

const SearchMultiSelect: React.FC<SearchMultiSelectProps> = ({
  options,
  selectedItems,
  onSelect,
  onRemove,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Ensure options are distinct
  const distinctOptions = useMemo(() => {
    return Array.from(new Set(options));
  }, [options]);

  const filteredOptions = useMemo(() => {
    return distinctOptions.filter(
      (option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedItems.includes(option)
    );
  }, [distinctOptions, searchTerm, selectedItems]);

  return (
    <div className="border border-gray-300 rounded-md p-4 w-full max-w-md relative">
      <div className="flex items-start mb-2">
        {/* Selected Items */}
        <div className="flex flex-wrap mr-2">
          {selectedItems.length === 0 ? (
            <div className="text-gray-500"></div>
          ) : (
            selectedItems.map((item) => (
              <span key={item} className="bg-blue-200 text-blue-800 rounded-full px-2 py-1 mr-2 mb-2 flex items-center shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
                {item}
                <button
                  onClick={() => onRemove(item)}
                  className="ml-1 text-red-500 hover:text-red-700"
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
          style={{ width: '80px' }} // Adjust width here
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
        />
      </div>

      {/* Options Dropdown */}
      {searchTerm && filteredOptions.length > 0 && (
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
                key={option}
                onClick={() => onSelect(option)}
                className="p-2 hover:bg-blue-100 cursor-pointer transition-colors duration-200 ease-in-out rounded-md"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMultiSelect;
