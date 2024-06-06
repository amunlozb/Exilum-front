import React, { useState, useEffect } from "react";
import { Accordion } from "flowbite-react";
import SearchBar from "./SearchBar";
import root_url from "../../const/root_url";

const MapInvestmentGroup = ({ title, limit, onSelectionChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [maps, setMaps] = useState({
    white: [],
    yellow: [],
    red: [],
    t17: [],
    other: [],
    blighted: [],
  });
  const [searchMatch, setSearchMatch] = useState(false);

  useEffect(() => {
    const fetchMaps = async () => {
      const whiteMaps = await fetch(`${root_url}/api/getMapsByTier?inputTier=WHITE`).then((res) => res.json());
      const yellowMaps = await fetch(`${root_url}/api/getMapsByTier?inputTier=YELLOW`).then((res) => res.json());
      const redMaps = await fetch(`${root_url}/api/getMapsByTier?inputTier=RED`).then((res) => res.json());
      const t17Maps = await fetch(`${root_url}/api/getMapsByTier?inputTier=T17`).then((res) => res.json());
      const otherMaps = await fetch(`${root_url}/api/getMapsByTier?inputTier=OTHER`).then((res) => res.json());
      const blightedMaps = await fetch(`${root_url}/api/getBlightedMaps`).then((res) => res.json());

      setMaps({
        white: whiteMaps,
        yellow: yellowMaps,
        red: redMaps,
        t17: t17Maps,
        other: otherMaps,
        blighted: blightedMaps,
      });
    };

    fetchMaps();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Check if any items match the search term
    const isMatch = Object.values(maps)
      .flat()
      .some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setSearchMatch(isMatch);
  }, [searchTerm, maps]);

  const handleItemClick = (tier, index) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (item) => item.tier === tier && item.index === index
      );
      if (isSelected) {
        return prevSelectedItems.filter(
          (item) => !(item.tier === tier && item.index === index)
        );
      } else if (prevSelectedItems.length < limit) {
        return [...prevSelectedItems, { tier, index }];
      } else {
        return prevSelectedItems;
      }
    });
  };

  useEffect(() => {
    const selectedNames = selectedItems
      .map(({ tier, index }) => maps[tier][index]?.name)
      .filter(Boolean);
    onSelectionChange(selectedNames);
  }, [selectedItems, maps, onSelectionChange]);

  const renderItems = (tier) => {
    return maps[tier]
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((item, index) => {
        const isSelected = selectedItems.some(
          (selItem) => selItem.tier === tier && selItem.index === index
        );
        return (
          <div
            key={index}
            className={`item ${
              isSelected ? "selected" : ""
            } border-2 border-black dark:border-gray-200 inline-block transition duration-200 ease-in`}
            title={`${item.name} - Tier: ${item.mapTier}`}
            onMouseDown={() => handleItemClick(tier, index)}
          >
            <div className="tooltip flex flex-wrap">
              <img src={item.icon_url} alt={item.name} draggable="false" />
              <span className="tooltiptext">{`${item.name} - Tier: ${item.mapTier}`}</span>
            </div>
          </div>
        );
      });
  };

  return (
    <div className="lg:w-7/12 w-full bg-white dark:bg-gray-900 rounded border-2 border-gray-300 dark:border-gray-700 py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden">
      <h1 className="mb-6 font-extrabold leading-none tracking-tight text-gray-900 text-3xl lg:text-3xl dark:text-white">
        {title}
      </h1>
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="selected-counter mb-3 dark:text-white">
        {`${selectedItems.length}/${limit} selected`}
      </div>
      <Accordion collapseAll>
        <Accordion.Panel>
          <Accordion.Title
            className={
              searchTerm !== "" &&
              maps.white.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length > 0
              ? "text-pink-500 dark:text-pink-400"
              : "text-black dark:text-white"
            }
          >
            White Maps
          </Accordion.Title>
          <Accordion.Content>{renderItems("white")}</Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title
            className={
              searchTerm !== "" &&
              maps.yellow.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length > 0
              ? "text-pink-500 dark:text-pink-400"
              : "text-black dark:text-white"
            }
          >
            Yellow Maps
          </Accordion.Title>
          <Accordion.Content>{renderItems("yellow")}</Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title
            className={
              searchTerm !== "" &&
              maps.red.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length > 0
                ? "text-pink-500 dark:text-pink-400"
                : "text-black dark:text-white"
            }
          >
            Red Maps
          </Accordion.Title>
          <Accordion.Content>{renderItems("red")}</Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title
            className={
              searchTerm !== "" &&
              maps.t17.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length > 0
                ? "text-pink-500 dark:text-pink-400"
                : "text-black dark:text-white"
            }
          >
            T17 Maps
          </Accordion.Title>
          <Accordion.Content>{renderItems("t17")}</Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title
            className={
              searchTerm !== "" &&
              maps.other.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length > 0
              ? "text-pink-500 dark:text-pink-400"
              : "text-black dark:text-white"
            }
          >
            Other Maps
          </Accordion.Title>
          <Accordion.Content>{renderItems("other")}</Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title
            className={
              searchTerm !== "" &&
              maps.blighted.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length > 0
              ? "text-pink-500 dark:text-pink-400"
              : "text-black dark:text-white"
            }
          >
            Blighted Maps
          </Accordion.Title>
          <Accordion.Content>{renderItems("blighted")}</Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default MapInvestmentGroup;
