import React from "react";
import { useState } from "react";

import SearchBar from "./SearchBar";

function InvestmentGroup( {title, hasSearch, content}) {

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    // If the item matches the search, add the "highlight" class to it, otherwise, just render the item
    {content.map(item => (
        <div className={`item ${item.toLowerCase().includes(searchTerm.toLowerCase()) ? 'highlight' : ''}`}>
            {item}
        </div>
    ))}

    return (
        <div className="text-center w-fit pb-12 md:pt-40 md:pb-20 bg-slate-200 border-4 border-black">
            <h1>{title}</h1>
            
            {/* Conditionally show Search */}
            {hasSearch && <SearchBar onSearchChange={handleSearchChange} />}
            
            {/* Map and render content */}
            {content.map(item => (
                // If the item matches the search, add the "highlight" class to it, otherwise, just render the item
                <div key={item} className={`item ${searchTerm && item.toLowerCase().includes(searchTerm.toLowerCase()) ? 'highlight' : ''}`}>
                    {item}
                </div>
            ))}
        </div>
    );
}

export default InvestmentGroup;
