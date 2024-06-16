import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Flowbite, Button, Spinner } from "flowbite-react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ItemCategory from "../partials/quantity_selection/ItemCategory";
import axios from 'axios';
import root_url from "../const/root_url";

function QuantitySelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state;

  const initialQuantities = Object.values(selectedItems).flat().reduce((acc, item) => {
    acc[item.name] = 1;
    return acc;
  }, {});

  const [quantities, setQuantities] = useState(initialQuantities);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (itemName, quantity) => {
    console.log(`New quantity for ${itemName}: ${quantity}`);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: quantity,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const requestBody = {
      scarabs: selectedItems.scarabs.map((item) => ({
        name: item.name,
        quantity: quantities[item.name],
        icon_url: item.icon_url
      })),
      deliriumOrbs: selectedItems.deliriumOrbs.map((item) => ({
        name: item.name,
        quantity: quantities[item.name],
        icon_url: item.icon_url 
      })),
      mapDeviceCrafts: selectedItems.mapDeviceCrafts.map((item) => ({
        name: item.name,
        quantity: quantities[item.name],
        icon_url: item.icon_url 
      })),
      maps: selectedItems.maps.map((item) => ({
        name: item.name,
        quantity: quantities[item.name],
        icon_url: item.icon_url 
      })),
      craftingMaterials: selectedItems.craftingMaterials.map((item) => ({
        name: item.name,
        quantity: quantities[item.name],
        icon_url: item.icon_url 
      })),
    };

    try {
      const response = await axios.post(
        `${root_url}/api/strategy/price`,
        requestBody
      );

      console.log("Response from Server:", response.data);
      navigate("/summary", {
        state: { prices: response.data, selectedItems: requestBody }, 
      });
    } catch (error) {
      console.error("Error fetching prices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedScarabs = selectedItems.scarabs || [];
  const selectedDeliriumOrbs = selectedItems.deliriumOrbs || [];
  const selectedMapDeviceCrafts = selectedItems.mapDeviceCrafts || [];
  const selectedMaps = selectedItems.maps || [];
  const selectedCraftingMaterials = selectedItems.craftingMaterials || [];

  const totalSelectedScarabs = selectedScarabs.reduce((acc, item) => acc + (quantities[item.name] || 0), 0);
  const totalSelectedDeliriumOrbs = selectedDeliriumOrbs.reduce((acc, item) => acc + (quantities[item.name] || 0), 0);

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col items-center gap-10 my-32 text-center">
          <div className="container px-4 mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-5">
                <Spinner aria-label="Loading spinner" size="lg" color="pink" />
                <span className="pl-3 font-semibold text-pink-400 h4">
                  Calculating...
                </span>
              </div>
            ) : (
              <>
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
                  items={selectedMapDeviceCrafts}
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

                <div className="flex justify-center mt-8 text-center align-middle">
                  <Button
                    className="px-4 py-2 mr-4 text-white bg-blue-500 rounded-md"
                    onClick={handleSubmit}
                  >
                    Calculate
                  </Button>
                  <Button
                    className="mr-4 text-white bg-red-500 rounded-md"
                    as={Link}
                    to="/"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default QuantitySelection;
