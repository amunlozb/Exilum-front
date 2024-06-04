// ItemCategory.jsx
import React from "react";

function ItemCategory({
  categoryTitle,
  items,
  quantities,
  handleQuantityChange,
  hasInput,
  showImage = true,
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-5 py-3">{categoryTitle}</h2>
      <div className="grid grid-col justify-center gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full"
          >
            <div className="flex items-center space-x-4 w-full">
              {showImage && (
                <img src={item.icon_url} alt={item.name} className="w-9 h-9" />
              )}
              <span className="flex-1">{item.name}</span>
            </div>
            {hasInput && (
              <form className="flex flex-col items-center">
                {/* <label
                  htmlFor={`quantity-input-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose quantity:
                </label> */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuantityChange(
                        item.name,
                        Math.max((quantities[item.name] || 0) - 1, 1)
                      )
                    }
                    className="bg-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
                    id={`quantity-input-${index}`}
                    value={quantities[item.name]}
                    onChange={(e) =>
                      handleQuantityChange(item.name, e.target.value)
                    }
                    min={1}
                    max={5}
                    className="bg-white border-t border-b border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-16 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="999"
                    required
                  />
                  <button
                    type="button"
                    onMouseDown={() =>
                      handleQuantityChange(
                        item.name,
                        Math.min((quantities[item.name] || 0) + 1, 5)
                      )
                    }
                    className="bg-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
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
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Please select a number between 1 and 5.
                </p>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemCategory;
