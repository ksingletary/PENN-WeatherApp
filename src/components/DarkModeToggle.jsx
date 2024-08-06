// src/components/DarkModeToggle.jsx
import React from 'react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" id="toggle_checkbox" className="hidden" checked={isDarkMode} onChange={toggleDarkMode} />
      <label htmlFor="toggle_checkbox" className="relative w-28 border border-borderGray h-14 bg-blue-400 rounded-full cursor-pointer transition duration-300 ease-in-out overflow-hidden">
        <div id="star" className="absolute top-3 left-3 w-7 h-7 bg-yellow-400 rounded-full transition-all duration-300 ease-in-out"></div>
        <div id="moon" className="absolute bottom-[-52px] right-2 w-10 h-10 bg-white rounded-full transition-all duration-300 ease-in-out"></div>
      </label>
    </div>
  );
};

export default DarkModeToggle;