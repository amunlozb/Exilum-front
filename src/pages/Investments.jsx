// Investments.jsx
import React, { useState, useCallback } from "react";
import { Flowbite } from "flowbite-react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import SelectableInvestmentGroup from "../partials/investments/SelectableInvestmentGroup";
import OptionInvestmentGroup from "../partials/investments/OptionInvestmentGroup";

function Investments() {
  const [selectedScarabs, setSelectedScarabs] = useState([]);
  const [selectedDeliriumOrbs, setSelectedDeliriumOrbs] = useState([]);
  const [selectedMapDeviceCraft, setSelectedMapDeviceCraft] = useState(null);

  const sampleContent = [
    { alt: "Image 1", imageSrc: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png" },
    { alt: "Image 2", imageSrc: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png" },
    { alt: "Image 3", imageSrc: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png" },
    { alt: "Image 4", imageSrc: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png" }
  ];

  const content2 = [
    { name: "Harbinger", description: "Map contains 2 additional Harbingers", price: 6 },
    { name: "Breach", description: "Map contains an additional Breach", price: 6 },
    { name: "Delirium", description: "Map contains an additional Delirium Mirror", price: 6 }
  ];

  const handleCalculate = () => {
    const data = {
      scarabs: selectedScarabs,
      deliriumOrbs: selectedDeliriumOrbs,
      mapDeviceCraft: selectedMapDeviceCraft
    };

    alert(`Selected Data: ${JSON.stringify(data, null, 2)}`);
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

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        <Header />
        <main className="flex flex-col my-36 gap-10 items-center text-center">
          {/* Scarabs */}
          <SelectableInvestmentGroup
            title="Scarabs"
            hasSearch={true}
            content={sampleContent}
            limit={4}
            onSelectionChange={handleScarabsChange}
          />
          {/* Delirium Orbs */}
          <SelectableInvestmentGroup
            title="Delirium Orbs"
            hasSearch={true}
            content={sampleContent}
            limit={6}
            onSelectionChange={handleDeliriumOrbsChange}
          />
          {/* Map Device Craft */}
          <OptionInvestmentGroup
            title="Map Device Craft"
            hasSearch={true}
            content={content2}
            limit={1}
            onSelectionChange={handleMapDeviceCraftChange}
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
