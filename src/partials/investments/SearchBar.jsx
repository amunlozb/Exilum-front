import React from "react";

function SearchBar({ onSearchChange }) {
    return (
        <div className="search-container p-3">
            <input 
                type="text" 
                className="search-input bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded border-2" 
                placeholder="Search..." 
                onChange={onSearchChange} 
            />
        </div>
    );
}

export default SearchBar;
