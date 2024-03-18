import React from "react";

function SearchBar({ onSearchChange }) {
    return (
    <div className="text-center relative pt-32 pb-12 md:pt-40 md:pb-20">
        <input 
            type="text" 
            placeholder="Search..." 
            onChange={onSearchChange} 
        />
    </div>
    )
}

export default SearchBar;
