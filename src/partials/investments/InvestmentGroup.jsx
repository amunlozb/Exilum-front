import React, { useState } from "react";
import SearchBar from "./SearchBar";

function InvestmentGroup({ title, hasSearch, content }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleItemClick = (index) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(index)) {
                // Deselect item
                return prevSelectedItems.filter((i) => i !== index);
            } else if (prevSelectedItems.length < 4) {
                // Select item if less than 4 are selected
                return [...prevSelectedItems, index];
            } else {
                // If 4 items are already selected, do nothing
                return prevSelectedItems;
            }
        });
    };

    return (
        <div className="text-center w-fit p-10 bg-gray-200 rounded">
            <h1>{title}</h1>

            {/* Conditionally show Search */}
            {hasSearch && <SearchBar onSearchChange={handleSearchChange} />}

            {/* Counter for selected items */}
            <div className="selected-counter mb-3">
                {`${selectedItems.length}/4 selected`}
            </div>

            {/* Wrap content in a flex div */}
            <div className="flex-wrap">
                {/* Map and render content */}
                {content.map((item, index) => {
                    const isHighlighted = searchTerm &&
                        item.alt.toLowerCase().includes(searchTerm.toLowerCase());
                    const isSelected = selectedItems.includes(index);
                    const isDarkened = searchTerm && !isHighlighted && !isSelected;

                    return (
                        <div
                            key={index}
                            className={`item ${
                                isHighlighted ? "highlight" : ""
                            } ${
                                isSelected ? "selected" : ""
                            } ${
                                isDarkened ? "darkened" : ""
                            } border-2 border-black inline-block`}
                            title={item.text} // Show text as tooltip 
                            onClick={() => handleItemClick(index)} // Add click handler
                        >
                            {/* hover tooltip */}
                            <div className="tooltip flex flex-wrap">
                                <img src={item.imageSrc} alt={item.alt} />
                                <span className="tooltiptext">{item.alt}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default InvestmentGroup;