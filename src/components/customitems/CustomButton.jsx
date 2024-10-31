import React from 'react';

const CustomButton = ({ onClick, label, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded  hover:bg-gray-400 ${className}`} 
    >
      {label}
    </button>
  );
};

export default CustomButton;
