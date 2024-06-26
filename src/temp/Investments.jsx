import React, { useState, useEffect, useCallback } from "react";
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
  const [selectedMapDeviceCraft, setSelectedMapDeviceCraft] = useState(null);
  const [selectedCraftingMaterials, setSelectedCraftingMaterials] = useState([]);
  const [scarabs, setScarabs] = useState([]);
  const [maps, setMaps] = useState([]);
  const [deliriumOrbs, setDeliriumOrbs] = useState([]);
  const [deviceCrafts, setDeviceCrafts] = useState([]);
  const [craftingMaterials, setCraftingMaterials] = useState([]);

  useEffect(() => {
    const fetchScarabs = async () => {
      try {
        const response = await fetch("https://exilum-back-c24f5etkvq-ey.a.run.app/api/getScarabs");
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

    fetchScarabs();
    fetchDeliriumOrbs();
    fetchDeviceCrafts();
    fetchCraftingMaterials();
  }, []);

  const handleCalculate = () => {
    const data = {
      scarabs: selectedScarabs,
      deliriumOrbs: selectedDeliriumOrbs,
      mapDeviceCraft: selectedMapDeviceCraft,
      maps: selectedMaps,
      craftingMaterials: selectedCraftingMaterials,
    };

    alert(`Selected Data: ${JSON.stringify(data, null, 2)}`);
    console.log(JSON.stringify(data, null, 2));
  };

  const handleScarabsChange = useCallback((selected) => {
    setSelectedScarabs(selected);
  }, []);

  const handleDeliriumOrbsChange = useCallback((selected) => {
    setSelectedDeliriumOrbs(selected);
  }, []);

  const handleMapDeviceCraftChange = useCallback((selected) => {
    setSelectedMapDeviceCraft(selected);
  }, []);

  const handleCraftingMaterialsChange = useCallback((selected) => {
    setSelectedCraftingMaterials(selected);
  }, []);

  const handleMapChange = useCallback((selected) => {
    setSelectedMaps(selected);
  }, []);

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        <Header />
        <main className="flex flex-col my-36 gap-10 items-center text-center">
          {/* Scarabs */}
          <SelectableInvestmentGroup
            title="Scarabs"
            hasSearch={true}
            content={scarabs}
            limit={4}
            onSelectionChange={handleScarabsChange}
          />
          {/* Maps */}
          <MapInvestmentGroup
            title="Maps"
            limit={1}
            onSelectionChange={handleMapChange}
          />
          {/* Delirium Orbs */}
          <SelectableInvestmentGroup
            title="Delirium Orbs"
            hasSearch={true}
            content={deliriumOrbs}
            limit={5}
            hasQuantities={true}  // Enable quantity selection
            onSelectionChange={handleDeliriumOrbsChange}
          />
          {/* Device Crafts */}
          <OptionInvestmentGroup
            title="Map Device Craft"
            hasSearch={true}
            content={deviceCrafts}
            limit={1}
            onSelectionChange={handleMapDeviceCraftChange}
          />
          {/* Crafting Materials */}
          <SelectableInvestmentGroup
            title="Crafting Materials"
            hasSearch={true}
            content={craftingMaterials}
            limit={5}
            hasQuantities={true}  // Enable quantity selection
            onSelectionChange={handleCraftingMaterialsChange}
          />
          {/* Calculate Button */}
          <button
            className="btn text-white bg-pink-700 hover:bg-pink-800 active:bg-pink-900 shadow-xl select-none pointer-events-auto text-xl px-8 py-3 rounded-lg transition duration-150 ease-in-out"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default Investments;
