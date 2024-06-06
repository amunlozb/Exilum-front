import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ItemCategory from "../partials/quantity_selection/ItemCategory"; 

function QuantitySelection() {
  const location = useLocation();
  const { selectedItems } = location.state;

  const initialQuantities = Object.values(selectedItems).flat().reduce((acc, item) => {
    acc[item.name] = 1;
    return acc;
  }, {});

  const [quantities, setQuantities] = useState(initialQuantities);

  const handleQuantityChange = (itemName, quantity) => {
    console.log(`New quantity for ${itemName}: ${quantity}`);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: quantity,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = {
      scarabs: selectedItems.scarabs.map(item => ({ name: item.name, quantity: quantities[item.name] })),
      deliriumOrbs: selectedItems.deliriumOrbs.map(item => ({ name: item.name, quantity: quantities[item.name] })),
      mapDeviceCraft: selectedItems.mapDeviceCraft.map(item => ({ name: item.name, quantity: quantities[item.name] })),
      maps: selectedItems.maps.map(item => ({ name: item.name, quantity: quantities[item.name] })),
      craftingMaterials: selectedItems.craftingMaterials.map(item => ({ name: item.name, quantity: quantities[item.name] })),
    };
    console.log("Selected items with quantities:", JSON.stringify(result, null, 2));
  };

  const selectedScarabs = selectedItems.scarabs || [];
  const selectedDeliriumOrbs = selectedItems.deliriumOrbs || [];
  const selectedMapDeviceCraft = selectedItems.mapDeviceCraft || [];
  const selectedMaps = selectedItems.maps || [];
  const selectedCraftingMaterials = selectedItems.craftingMaterials || [];

  const totalSelectedScarabs = selectedScarabs.reduce((acc, item) => acc + (quantities[item.name] || 0), 0);
  const totalSelectedDeliriumOrbs = selectedDeliriumOrbs.reduce((acc, item) => acc + (quantities[item.name] || 0), 0);

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col my-32 gap-10 items-center text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold">Select Quantity</h2>

            <ItemCategory
              categoryTitle="Scarabs"
              items={selectedScarabs}
              quantities={quantities}
              handleQuantityChange={handleQuantityChange}
              hasInput={true}
              showImage={true}
              maxSelectedItems={4}
              totalSelectedItems={totalSelectedScarabs}
            />
            <ItemCategory
              categoryTitle="Delirium Orbs"
              items={selectedDeliriumOrbs}
              quantities={quantities}
              handleQuantityChange={handleQuantityChange}
              hasInput={true}
              showImage={true}
              maxSelectedItems={5}
              totalSelectedItems={totalSelectedDeliriumOrbs}
            />
            <ItemCategory
              categoryTitle="Maps"
              items={selectedMaps}
              hasInput={false}
              showImage={true}
            />
            <ItemCategory
              categoryTitle="Map Device Craft"
              items={selectedMapDeviceCraft}
              hasInput={false}
              showImage={false}
            />
            <ItemCategory
              categoryTitle="Crafting Materials"
              items={selectedCraftingMaterials}
              quantities={quantities}
              handleQuantityChange={handleQuantityChange}
              hasInput={true}
              showImage={true}
              maxQuantity={20}
            />

            <div className="mt-8">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <Link to="/" className="text-blue-500">
                Cancel
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default QuantitySelection;
