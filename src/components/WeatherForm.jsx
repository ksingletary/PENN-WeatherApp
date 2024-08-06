import React, { useState } from 'react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const WeatherForm = ({ onFetchWeather }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetchWeather(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-3/4 justify-end">
      <div className="relative w-full left-80 ">
        <HiMiniMagnifyingGlass className="absolute text-customWhite2 left-3 top-5 w-4 h-4 transform -translate-y-1/2" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city"
          className="bg-blackDark border-transparent w-3/6 pl-10 p-2 border rounded-lg mb-4 text-customWhite focus:outline-none focus:ring-2 focus:border-transparent"
        />
      </div>
    </form>
  );
};

export default WeatherForm;