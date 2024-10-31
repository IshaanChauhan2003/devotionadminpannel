import React from 'react';

const CustomPicker = ({ selectedValue, onValueChange, options }) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-500"
    >
      <option value="" disabled>Select a role</option> {/* Placeholder option */}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default CustomPicker;
