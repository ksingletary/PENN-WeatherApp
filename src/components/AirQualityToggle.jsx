import React, { useState } from 'react';

const AirQualityToggle = () => {
  const [active, setActive] = useState('Forecast');

  const handleToggle = (option) => {
    setActive(option);
  };

  return (
    <div className="flex space-x-3 bg-blackDark rounded-full">
      <button
        onClick={() => handleToggle('Forecast')}
        className={`px-2 py-1 rounded-full ${
          active === 'Forecast' ? 'bg-blue-200 text-black' : 'bg-blackDark text-gray-400'
        }`}
      >
        Forecast
      </button>
      <button
        onClick={() => handleToggle('Air Quality')}
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