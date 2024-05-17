import React, { useState } from "react";
import SearchBar from "./SearchBar";

function OptionInvestmentGroup({ title, hasSearch, limit }) {

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

    const sampleData = [
        { name: "Harbinger", description: "Map contains 2 additional Harbingers", price: 6 },
        { name: "Breach", description: "Map contains an additional Breach", price: 6 },
        { name: "Delirium", description: "Map contains an additional Delirium Mirror", price: 6 }
    ];

    return (
        <div className=" lg:w-5/12 w-full bg-white dark:bg-gray-900 rounded border-2 border-gray-300 dark:border-gray-700 py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden">
            <h1 className="mb-6 font-extrabold leading-none tracking-tight text-gray-900 text-3xl lg:text-3xl dark:text-white">
                {title}
            </h1>

            {/* Conditionally show Search */}
            {hasSearch && <SearchBar onSearchChange={handleSearchChange} />}

            {/* Counter for selected items */}
            <div className="selected-counter mb-3 dark:text-white">
                {`${selectedItems.length}/${limit} selected`}
            </div>

            {/* Wrap content in a flex div */}
            <div className="flex justify-center">
                <div className="flex-wrap flex flex-col">
                    {/* Map and render sampleData */}
                    {sampleData.map((item, index) => {
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
                                } border-2 border-black dark:border-gray-200 inline-block`}
                                title={item.name} // tooltip = name
                                onMouseDown={() => handleItemClick(index)} // on MOUSE DOWN
                            >
                                {/* hover tooltip */}
                                <div className="tooltip flex flex-wrap">
                                    <span style={{ pointerEvents: "none" }}>{item.name}</span>
                                    <span className="tooltiptext">{item.description}</span>
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