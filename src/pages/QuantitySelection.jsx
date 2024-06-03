import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

function QuantitySelection() {
  const location = useLocation();
  const { selectedItems } = location.state;
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemName, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: quantity,
    }));
  };

  const handleSubmit = () => {
    // Do something with the selected items and quantities
    console.log("Selected items with quantities:", selectedItems, quantities);
    // Redirect to the previous screen or perform any other action
  };

  // Extracting selected items from selectedItems object
  const selectedScarabs = selectedItems.scarabs || [];

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col my-32 gap-10 items-center text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold">Select Quantity</h2>

            {/* Scarabs */}
            <h2 className="text-xl font-semibold mt-5 py-3">Scarabs</h2>

            <div className="grid grid-col justify-center gap-4">
              {selectedScarabs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.icon_url}
                      alt={item.name}
                      className="w-9 h-9"
                    />
                    <span className="flex-1">{item.name}</span>
                  </div>
                  <form className="flex flex-col items-center">
                    <label
                      htmlFor={`quantity-input-${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Choose quantity:
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            item.name,
                            Math.max((quantities[item.name] || 0) - 1, 1) // Ensure minimum value of 1
                          )
                        }
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
                      </button>
                      <input
                        type="text"
                        id={`quantity-input-${index}`}
                        value={quantities[item.name] || 0}
                        onChange={(e) =>
                          handleQuantityChange(item.name, e.target.value)
                        }
                        min={1}
                        max={5} 
                        className="bg-gray-50 border-t border-b border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-16 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="999"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            item.name,
                            Math.min((quantities[item.name] || 0) + 1, 5)
                          )
                        }
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Please select a number between 1 and 5.
                    </p>
                  </form>
                </div>
              ))}
            </div>

            {/* Other item categories go here */}

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
      </div>
    </Flowbite>
  );
}

export default QuantitySelection;
