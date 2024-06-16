// Investments.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import SelectableInvestmentGroup from "../partials/investments/SelectableInvestmentGroup";
import OptionInvestmentGroup from "../partials/investments/OptionInvestmentGroup";
import MapInvestmentGroup from "../partials/investments/MapInvestmentGroup";
import root_url from "../const/root_url";

function Investments() {
  const [selectedScarabs, setSelectedScarabs] = useState([]);
  const [selectedDeliriumOrbs, setSelectedDeliriumOrbs] = useState([]);
  const [selectedMaps, setSelectedMaps] = useState([]);
  const [selectedMapDeviceCrafts, setSelectedMapDeviceCrafts] = useState([]);
  const [selectedCraftingMaterials, setSelectedCraftingMaterials] = useState([]);
  const [scarabs, setScarabs] = useState([]);
  const [maps, setMaps] = useState([]);
  const [deliriumOrbs, setDeliriumOrbs] = useState([]);
  const [deviceCrafts, setDeviceCrafts] = useState([]);
  const [craftingMaterials, setCraftingMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScarabs = async () => {
      try {
        const response = await fetch(`${root_url}/api/getScarabs`);
        const data = await response.json();
        setScarabs(data);
      } catch (error) {
        console.error("Failed to fetch scarabs:", error);
      }
    };

    const fetchDeliriumOrbs = async () => {
      try {
        const response = await fetch(`${root_url}/api/getDeliriumOrbs`);
        const data = await response.json();
        setDeliriumOrbs(data);
      } catch (error) {
        console.error("Failed to fetch delirium orbs:", error);
      }
    };

    const fetchDeviceCrafts = async () => {
      try {
        const response = await fetch(`${root_url}/api/getDeviceCrafts`);
        const data = await response.json();
        setDeviceCrafts(data);
      } catch (error) {
        console.error("Failed to fetch device crafts:", error);
      }
    };

    const fetchCraftingMaterials = async () => {
      try {
        const response = await fetch(`${root_url}/api/getCraftingMaterials`);
        const data = await response.json();
        setCraftingMaterials(data);
      } catch (error) {
        console.error("Failed to fetch crafting materials:", error);
      }
    };

    const fetchMaps = async () => {
      try {
        const response = await fetch(`${root_url}/api/getMaps`);
        const data = await response.json();
        setMaps(data);
      } catch (error) {
        console.error("Failed to fetch maps:", error);
      }
    };

    fetchMaps();
    fetchScarabs();
    fetchDeliriumOrbs();
    fetchDeviceCrafts();
    fetchCraftingMaterials();
  }, []);

  const handleNext = () => {
    if (scarabs.length === 0) {
      console.error("Scarabs data is not yet fetched.");
      return;
    }
  
    const selectedItems = {
      scarabs: selectedScarabs.map(name => ({
        name,
        icon_url: scarabs.find(item => item.name === name).icon_url
      })),
      deliriumOrbs: selectedDeliriumOrbs.map(name => ({
        name,
        icon_url: deliriumOrbs.find(item => item.name === name).icon_url
      })),
      mapDeviceCrafts: selectedMapDeviceCrafts.map(name => ({
        name,
        icon_url: deviceCrafts.find(item => item.name === name).icon_url
      })),
      maps: selectedMaps.map(name => ({
        name,
        icon_url: maps.find(item => item.name === name).icon_url
      })),
      craftingMaterials: selectedCraftingMaterials.map(name => ({
        name,
        icon_url: craftingMaterials.find(item => item.name === name).icon_url
      }))
    };
  
    console.log("Selected items before navigation:", selectedItems);
    navigate("/quantity-selection", { state: { selectedItems } });
  };
  
  
  

  const handleScarabsChange = useCallback((selected) => {
    setSelectedScarabs(selected);
  }, []);

  const handleDeliriumOrbsChange = useCallback((selected) => {
    setSelectedDeliriumOrbs(selected);
  }, []);

  const handleMapDeviceCraftsChange = useCallback((selected) => {
    setSelectedMapDeviceCrafts(selected);
  }, []);

  const handleMapChange = useCallback((selected) => {
    setSelectedMaps(selected);
  }, []);

  const handleCraftingMaterialsChange = useCallback((selected) => {
    setSelectedCraftingMaterials(selected);
  }, []);

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        <Header />
        <main className="flex flex-col my-36 gap-10 items-center text-center">
          <SelectableInvestmentGroup
            title="Scarabs"
            hasSearch={true}
            content={scarabs}
            limit={4}
            onSelectionChange={handleScarabsChange}
          />
          <MapInvestmentGroup
            title="Maps"
            limit={1}
            onSelectionChange={handleMapChange}
            />
            <SelectableInvestmentGroup
              title="Delirium Orbs"
              hasSearch={true}
              content={deliriumOrbs}
              limit={5}
              onSelectionChange={handleDeliriumOrbsChange}
            />
            <OptionInvestmentGroup
              title="Map Device Craft"
              hasSearch={true}
              content={deviceCrafts}
              limit={1}
              onSelectionChange={handleMapDeviceCraftsChange}
            />
            <SelectableInvestmentGroup
              title="Crafting Materials"
              hasSearch={true}
              content={craftingMaterials}
              limit={4}
              onSelectionChange={handleCraftingMaterialsChange}
            />
            <button
              className="btn text-white bg-pink-700 hover:bg-pink-800 active:bg-pink-900 shadow-xl select-none pointer-events-auto text-xl px-8 py-3 rounded-lg transition duration-150 ease-in-out"
              onClick={handleNext}
            >
              Next
            </button>
          </main>
          <Footer />
        </div>
      </Flowbite>
    );
  }
  
  export default Investments;
  
