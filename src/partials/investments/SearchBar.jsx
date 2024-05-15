import React from "react";

function SearchBar({ onSearchChange }) {
    return (
        <div className="search-container p-3">
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search..." 
                onChange={onSearchChange} 
            />
        </div>
    );
}

export default SearchBar;
