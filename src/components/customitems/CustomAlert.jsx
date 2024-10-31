// CustomAlert.js
import React from 'react';

const CustomAlert = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">{message}</h2>
        <div className="flex justify-between">
          <button 
            onClick={onConfirm} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Confirm
          </button>
          <button 
            onClick={onCancel} 
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
