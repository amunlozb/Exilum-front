import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SelectableInvestmentGroup = ({ title, hasSearch, content, limit, hasQuantities, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectionChange = (item) => {
    let newSelectedItems = [...selectedItems];
    const index = newSelectedItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      newSelectedItems.splice(index, 1);
      if (hasQuantities) {
        const newQuantities = { ...quantities };
        delete newQuantities[item.id];
        setQuantities(newQuantities);
      }
    } else {
      if (newSelectedItems.length < limit) {
        newSelectedItems.push(item);
        if (hasQuantities) {
          setQuantities({ ...quantities, [item.id]: 1 });
        }
      }
    }
    setSelectedItems(newSelectedItems);
    onSelectionChange(newSelectedItems.map(i => hasQuantities ? { ...i, quantity: quantities[i.id] || 1 } : i));
  };

  const handleQuantityChange = (item, quantity) => {
    const newQuantities = { ...quantities, [item.id]: quantity };
    setQuantities(newQuantities);
    const newSelectedItems = selectedItems.map(i => {
      if (i.id === item.id) {
        return { ...i, quantity: newQuantities[item.id] };
      }
      return i;
    });
    setSelectedItems(newSelectedItems);
    onSelectionChange(newSelectedItems);
  };

  const getTotalQuantity = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + parseInt(qty || 0), 0);
  };

  const filteredContent = content.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white my-4">{title}</h2>
      {hasSearch && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none"
        />
      )}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredContent.map(item => (
          <li key={item.id} className="flex items-center p-4">
            <img src={item.icon_url} alt={item.name} className="w-10 h-10 mr-4" />
            <label className="flex-1 flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedItems.some(i => i.id === item.id)}
                onChange={() => handleSelectionChange(item)}
                className="form-checkbox h-5 w-5 text-pink-600"
              />
              <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
            </label>
            {hasQuantities && selectedItems.some(i => i.id === item.id) && (
              <input
                type="number"
                min="1"
                max="5"
                value={quantities[item.id] || 1}
                onChange={(e) => handleQuantityChange(item, e.target.value)}
                className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-center"
              />
            )}
          </li>
        ))}
      </ul>
      {hasQuantities && <p className="text-right p-4 text-gray-700 dark:text-gray-300">Total Quantity: {getTotalQuantity()}/{limit}</p>}
    </div>
  );
};

SelectableInvestmentGroup.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearch: PropTypes.bool,
  content: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  hasQuantities: PropTypes.bool,
  onSelectionChange: PropTypes.func.isRequired,
};

export default SelectableInvestmentGroup;
