import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Flowbite, Button, Label, Spinner } from "flowbite-react";
import { FaLink } from "react-icons/fa";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axios from 'axios';
import root_url from "../const/root_url";

function Summary() {
  const location = useLocation();
  const { prices: initialPrices } = location.state || {}; 
  const { prices } = location.state;
  const [mapMultiplier, setMapMultiplier] = useState(1);


  const calculateTotalPrice = () => {
    let total = 0;
    for (const category in prices) {
      for (const item of prices[category]) {
        total += item.price * item.quantity * mapMultiplier;
      }
    }
    return total.toFixed(2);
  };

  const handleMultiplierIncrease = () => {
    setMapMultiplier(mapMultiplier + 1);
  };

  const handleMultiplierDecrease = () => {
    setMapMultiplier(Math.max(1, mapMultiplier - 1));
  };

  const handleShareClick = async () => {
    try {
      // Change button text 
      const button = document.getElementById("shareButton");
      button.innerHTML = '<FaCheck className="mr-2 h-5 w-5" /><span className="text-lg">Link Copied</span>';
      // Link logic
      const response = await axios.post(`${root_url}/api/share`, prices); 
      const shareUUID = response.data;
      const shareLink = `${window.location.origin}/shared/${shareUUID}`; 
      navigator.clipboard.writeText(shareLink);

    } catch (error) {
      console.error("Error creating share link:", error);
    }
  };

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col my-20 gap-10 items-center text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold py-5">Summary</h2>
            {Object.keys(prices).length === 0 ? ( 
              <div className="flex justify-center items-center py-5">
                <Spinner
                  aria-label="Spinner button example"
                  size="lg"
                  color="pink"
                />
                <span className="pl-3 font-semibold text-pink-400 h4">
                  Loading your strategy data...
                </span>
              </div>
            ) : (
              <>
                <table className="min-w-full divide-y divide-gray-400 border-gray-800 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-gray-800 dark:border-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                      >
                        Price Per Unit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                      >
                        Total Price
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {Object.entries(prices).map(([category, items]) =>
                      items.map((item) => (
                        <tr key={item.name}>
                          <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                            <img
                              src={item.icon_url}
                              alt={item.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900 dark:text-white">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {item.quantity * mapMultiplier}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {(
                              item.price * item.quantity * mapMultiplier
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>

                  {/* TOTAL row */}
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-right font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400 h3 px-6">
                          Total
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold bg-gradient-to-r from-purple-500 to-pink-400 rounded-b-lg text-white">
                        {calculateTotalPrice()}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div className="flex w-full mb-6 justify-start align-middle items-end ml-20 gap-24">
                  {/* Bulk Label and Inputs */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="map-multiplier" value="Bulk Amount" />
                    </div>

                    <div className="flex items-center rounded-lg justify-center">
                      {/* Decrease Button */}
                      <button
                        type="button"
                        onClick={handleMultiplierDecrease}
                        className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>

                      <input
                        type="text"
                        value={mapMultiplier}
                        onChange={(e) =>
                          setMapMultiplier(Number(e.target.value))
                        }
                        className="w-12 text-center font-bold border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:bg-black"
                      />

                      {/* Increase Button */}
                      <button
                        type="button"
                        onClick={handleMultiplierIncrease}
                        className={`bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none `}
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <Button gradientDuoTone="greenToBlue" onClick={handleShareClick}>
                    <FaLink className="mr-2 h-5 w-5"/>
                    <span className="text-lg" id="shareButton">
                      Copy link
                    </span>
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

export default Summary;