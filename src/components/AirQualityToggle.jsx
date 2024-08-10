import { useState } from 'react';

const AirQualityToggle = ({ active, onToggle }) => {
  return (
    <div className="flex space-x-3 bg-blackDark rounded-full">
      <button
        onClick={() => onToggle('Forecast')}
        className={`px-2 py-1 rounded-full ${
          active === 'Forecast' ? 'bg-blue-200 text-black' : 'bg-blackDark text-gray-400'
        }`}
      >
        Forecast
      </button>
      <button
        onClick={() => onToggle('Air Quality')}
        className={`px-2 py-1 rounded-full ${
          active === 'Air Quality' ? 'bg-blue-200 text-black' : 'bg-blackDark text-gray-400'
        }`}
      >
        Air Quality
      </button>
    </div>
  );
};
export default AirQualityToggle;