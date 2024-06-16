import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Flowbite, Spinner, Label, Button } from "flowbite-react";
import { FaLink } from "react-icons/fa";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axios from "axios";
import root_url from "../const/root_url";

function Summary() {
  const location = useLocation();
  const { prices: initialPrices } = location.state || {}; 
  const [prices, setPrices] = useState(initialPrices || {});
  const [mapMultiplier, setMapMultiplier] = useState(1);

  const { uuid } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      if (uuid) { 
        try {
          const response = await axios.get(`${root_url}/api/share/${uuid}`);
          setPrices(response.data);
        } catch (error) {
          console.error("Error fetching shared data:", error);
        }
      }
    };
    fetchData();
  }, [uuid]);

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
      const button = document.getElementById("shareButton");
      // Change button text and icon immediately
      button.innerHTML = '<FaCheck className="w-5 h-5 mr-2" /><span className="text-lg">Link Copied</span>';
      const shareLink = `${window.location}`;
  
      
      navigator.clipboard.writeText(shareLink);
    } catch (error) {
      console.error("Error creating share link:", error);
    }
  };
  


  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col items-center gap-10 my-20 text-center">
          <div className="container px-4 mx-auto">
            <h2 className="py-5 text-4xl font-bold">Summary</h2>
            {Object.keys(prices).length === 0 ? ( 
              <div className="flex items-center justify-center py-5">
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
                <table className="min-w-full border-gray-800 divide-y divide-gray-400 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-gray-800 dark:border-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200"
                      >
                        Price Per Unit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200"
                      >
                        Total Price
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {Object.entries(prices).map(([category, items]) =>
                      items.map((item) => (
                        <tr key={item.name}>
                          <td className="flex justify-center px-6 py-4 whitespace-nowrap">
                            <img
                              src={item.icon_url}
                              alt={item.name}
                              className="object-cover w-10 h-10 rounded-full"
                            />
                          </td>
                          <td className="px-6 py-4 text-gray-900 whitespace-nowrap text-md dark:text-white">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-200">
                            {item.quantity * mapMultiplier}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-200">
                            {item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
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
                    <td colSpan="3" className="px-6 py-4 text-left">
                        <div className="flex items-end justify-start w-full gap-40 align-middle">
                          {/* Bulk Label and Inputs */}
                          <div className="flex items-center">
                            <Label htmlFor="map-multiplier" value="Bulk Amount" className="mr-2" />
                            <button
                              type="button"
                              onClick={handleMultiplierDecrease}
                              className="h-10 p-2 bg-gray-200 border border-gray-300 rounded-l-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-4 h-4 text-gray-900 dark:text-white"
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
                              onChange={(e) => setMapMultiplier(Number(e.target.value))}
                              className="w-12 font-bold text-center border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:bg-black"
                            />
                            <button
                              type="button"
                              onClick={handleMultiplierIncrease}
                              className="h-10 p-2 bg-gray-200 border border-gray-300 rounded-r-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-4 h-4 text-gray-900 dark:text-white"
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
                          <Button gradientDuoTone="greenToBlue" onClick={handleShareClick} className="flex items-center">
                            <FaLink className="w-5 h-5 mr-2" />
                            <span className="text-lg" id="shareButton">
                              Copy link
                            </span>
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-right">
                        <span className="px-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 h3">Total</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-white rounded-b-lg bg-gradient-to-r from-purple-500 to-pink-400">
                        {calculateTotalPrice()}
                      </td>
                    </tr>
                    
                  </tfoot>
                </table>
                 
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