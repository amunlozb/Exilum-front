import React from "react";

function SearchBar({ onSearchChange }) {
    return (
    <div className="p-3">
        <input 
            type="text" 
            placeholder="Search..." 
            onChange={onSearchChange} 
        />
    </div>
    )
}

export default SearchBar;
