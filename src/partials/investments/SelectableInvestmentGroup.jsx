import React, { useState } from "react";
import SearchBar from "./SearchBar";

function InvestmentGroup({ title, hasSearch, content, limit}) {
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
        // Select item if less than 4 are selected
        return [...prevSelectedItems, index];
      } else {
        // If 4 items are already selected, do nothing
        return prevSelectedItems;
      }
    });
  };

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
        <div className="flex-wrap">
          {/* Map and render content */}
          {content.map((item, index) => {
            const isHighlighted =
              searchTerm &&
              item.alt.toLowerCase().includes(searchTerm.toLowerCase());
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
                title={item.text} // tooltip = text
                onMouseDown={() => handleItemClick(index)} // on MOUSE DOWN
              >
                {/* hover tooltip */}
                <div className="tooltip flex flex-wrap">
                  <img src={item.imageSrc} alt={item.alt} draggable="false" />
                  <span className="tooltiptext">{item.alt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InvestmentGroup;
