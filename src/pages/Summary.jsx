import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import root_url from "../const/root_url";

function Summary() {
  const location = useLocation();
  const { selectedItems, prices } = location.state;

  // Calculate the total price
  const calculateTotalPrice = () => {
    let total = 0;
    for (const category in prices) {
      for (const item of prices[category]) {
        total += item.price * item.quantity;
      }
    }
    return total;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col my-20 gap-10 items-center text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold">Summary</h2>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Price Per Unit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(prices).map(([category, items]) =>
                  items.map((item) => {
                    // Find the matching item in selectedItems to get the icon_url
                    const selectedItem = selectedItems[category]?.find(
                      (i) => i.name === item.name
                    );

                    return (
                      <tr key={item.name}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {selectedItem?.icon_url && ( 
                            <img
                              src={selectedItem.icon_url}
                              alt={item.name}
                              className="inline-block h-6 w-6 mr-2"
                            />
                          )}
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {item.price * item.quantity} 
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              {/* TOTAL row */}
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-bold">
                  </td>
                  <td className="px-6 py-4 font-bold">
                    {totalPrice}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="mt-8">
              <Link to="/" className="text-blue-500">
                Go Back
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default Summary;