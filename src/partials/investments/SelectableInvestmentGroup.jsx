import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchBar from "./SearchBar";

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function SelectableInvestmentGroup({
  title,
  hasSearch,
  content,
  limit,
  onSelectionChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (index) => {
    console.log("Item clicked:", index); // Debugging
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(index)) {
        return prevSelectedItems.filter((i) => i !== index);
      } else if (prevSelectedItems.length < limit) {
        return [...prevSelectedItems, index];
      } else {
        return prevSelectedItems;
      }
    });
  };

  const notifySelectionChange = useCallback(() => {
    onSelectionChange(selectedItems.map((index) => content[index].name));
  }, [selectedItems, content, onSelectionChange]);

  const prevSelectedItemsRef = useRef([]);
  useEffect(() => {
    if (!arraysEqual(selectedItems, prevSelectedItemsRef.current)) {
      notifySelectionChange();
      prevSelectedItemsRef.current = selectedItems;
    }
  }, [selectedItems, notifySelectionChange]);

  return (
    <div className="lg:w-7/12 w-full bg-white dark:bg-gray-900 rounded border-2 border-gray-300 dark:border-gray-700 py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden">
      <h1 className="mb-6 font-extrabold leading-none tracking-tight text-gray-900 text-3xl lg:text-3xl dark:text-white">
        {title}
      </h1>
      {hasSearch && <SearchBar onSearchChange={handleSearchChange} />}
      <div className="selected-counter mb-3 dark:text-white">
        {`${selectedItems.length}/${limit} selected`}
      </div>
      <div className="flex justify-center">
        <div className="flex-wrap">
          {content.map((item, index) => {
            const isHighlighted =
              searchTerm &&
              item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const isSelected = selectedItems.includes(index);
            const isDarkened = searchTerm && !isHighlighted && !isSelected;

            return (
              <div
                key={index}
                className={`item ${isHighlighted ? "highlight border-pink-400 dark:border-pink-400 transition-transform duration-300 ease-in" : ""} ${
                  isSelected ? "selected" : ""
                } ${
                  isDarkened ? "darkened" : ""
                } border-2 border-black dark:border-gray-200 inline-block transition duration-200 ease-in`}
                title={`${item.name} - ${item.mechanic} - $${item.price}`}
                onMouseDown={() => handleItemClick(index)}
              >
                <div className="tooltip flex flex-wrap">
                  <img src={item.icon_url} alt={item.name} draggable="false" />
                  <span className="tooltiptext">{item.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SelectableInvestmentGroup;
