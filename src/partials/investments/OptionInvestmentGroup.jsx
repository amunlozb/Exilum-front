// OptionInvestmentGroup.jsx

import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "./SearchBar";

function OptionInvestmentGroup({ title, hasSearch, content, limit, onSelectionChange }) {
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
            } else if (prevSelectedItems.length < limit) {
                // Select item if less than limit are selected
                return [...prevSelectedItems, index];
            } else {
                // If limit items are already selected, do nothing
                return prevSelectedItems;
            }
        });
    };

    // Function to notify parent about selection change
    const notifySelectionChange = useCallback(() => {
        onSelectionChange(selectedItems.map(index => content[index].name)); // Pass the name attribute
    }, [selectedItems, content, onSelectionChange]);

    // Update the selection change effect
    useEffect(() => {
        notifySelectionChange();
    }, [selectedItems]); // Re-run when selectedItems changes

    return (
        <div className="lg:w-5/12 w-full bg-white dark:bg-gray-900 rounded border-2 border-gray-300 dark:border-gray-700 py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden">
            <h1 className="mb-6 font-extrabold leading-none tracking-tight text-gray-900 text-3xl lg:text-3xl dark:text-white">
                {title}
            </h1>

            {hasSearch && <SearchBar onSearchChange={handleSearchChange} />}

            <div className="selected-counter mb-3 dark:text-white">
                {`${selectedItems.length}/${limit} selected`}
            </div>

            <div className="flex justify-center">
                <div className="flex flex-wrap flex-col">
                    {content.map((item, index) => {
                        const isHighlighted =
                            searchTerm &&
                            item.name.toLowerCase().includes(searchTerm.toLowerCase());
                        const isSelected = selectedItems.includes(index);
                        const isDarkened = searchTerm && !isHighlighted && !isSelected;

                        return (
                            <div
                                key={index}
                                className={`item ${isHighlighted ? "highlight" : ""} ${
                                    isSelected ? "selected" : ""
                                } ${
                                    isDarkened ? "darkened" : ""
                                } border-2 border-black dark:border-gray-200 inline-block px-9 transition duration-200 ease-in`}
                                title={item.name}
                                onMouseDown={() => handleItemClick(index)}
                            >
                                <div className="tooltip flex flex-wrap">
                                    <span className="pointer-events-none select-none w-full text-lg text-gray-800 dark:text-white">{item.name}</span>
                                    {/* Show price (in chaos) when hovered */}
                                    <span className="tooltiptext pointer-events-none select-none">{item.price} chaos orbs</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default OptionInvestmentGroup;
