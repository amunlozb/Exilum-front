import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Flowbite, Spinner, Button } from "flowbite-react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axios from 'axios';
import root_url from "../const/root_url";

function SharedSummary() {
  const { uuid } = useParams();
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${root_url}/api/share/${uuid}`);
        setPrices(response.data);
      } catch (error) {
        console.error("Error fetching shared data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [uuid]);

  const calculateTotalPrice = () => {
    let total = 0;
    for (const category in prices) {
      for (const item of prices[category]) {
        total += item.price * item.quantity;
      }
    }
    return total.toFixed(2);
  };

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col my-20 gap-10 items-center text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold py-5">Summary</h2>
            {loading ? (
              <div className="flex justify-center items-center py-5">
                  <Spinner aria-label="Spinner button example" size="lg" color="pink" />
                  <span className="pl-3 font-semibold text-pink-400 h4">Loading your strategy data...</span>
              </div>
            ) : (
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
                      className="px-6 py-3  text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
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
                      className="px-6 py-4  text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
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
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
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
            )}
          </div>
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default SharedSummary;
