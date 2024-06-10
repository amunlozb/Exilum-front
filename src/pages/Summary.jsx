import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

function Summary() {
  const location = useLocation();
  const { prices } = location.state;

  const calculateTotalPrice = () => {
    let total = 0;
    for (const category in prices) {
      for (const item of prices[category]) {
        total += item.price * item.quantity;
      }
    }
    return total.toFixed(2);
  };  

  const totalPrice = calculateTotalPrice();

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex flex-col my-20 gap-10 items-center text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold py-5">Summary</h2>

            <table className="min-w-full divide-y divide-gray-400 border-gray-800 rounded-lg">
              <thead className="bg-gray-50 dark:bg-gray-800 dark:border-white">
                <tr>
                  {/* Image column */}
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
                {Object.entries(prices).map(([category, items]) =>  // Iterate over categories
                  items.map((item) => ( // Iterate over items within each category
                    <tr key={item.name}>
                      {/* Image cell */}
                      <td className="px-6 py-4 whitespace-nowrap">
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
                        {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                        {item.price * item.quantity}
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
                {/* Total */}
              </span>
                  </td>
                  <td className="px-6 py-4 font-bold bg-gradient-to-r from-purple-500 to-pink-400 rounded-b-lg text-white">{totalPrice}</td>
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