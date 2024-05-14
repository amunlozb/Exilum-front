import React, { useState } from "react";
import SearchBar from "./SearchBar";

function InvestmentGroup({ title, hasSearch, content }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="text-center w-fit p-10 md  bg-slate-200 border-4 border-black">
      <h1>{title}</h1>

      {/* Conditionally show Search */}
      {hasSearch && <SearchBar onSearchChange={handleSearchChange} />}

      {/* Map and render content */}
      {content.map((item, index) => (
        // If the item matches the search, add the "highlight" class to it, otherwise, just render the item
        <div
          key={index}
          className={`item ${
            searchTerm &&
            (item.alt.toLowerCase().includes(searchTerm.toLowerCase()))
              ? "highlight"
              : ""
          }`}
          title={item.text} // Show text as tooltip
        >
          <img src={item.imageSrc} alt={item.alt} />
        </div>
      ))}
    </div>
  );
}

export default InvestmentGroup;
