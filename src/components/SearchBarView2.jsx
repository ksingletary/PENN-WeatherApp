import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBarView2 = ({ onFetchWeather }) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetchWeather(city).finally(() => setLoading(false));;
  };

  const handleClear = () => {
    setCity('');
  };

  return (
    <div className="flex justify-center items-center p-4 mr-52 ">
      <form onSubmit={handleSubmit} className="flex items-center rounded-sm bg-white shadow-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city/region"
          className="bg-transparent px-4 py-2 w-60 focus:outline-none "
        />
        {city && (
          <button type="button" onClick={handleClear} className="text-black px-2">
            <FaTimes />
          </button>
        )}
        <button type="submit" className="text-white rounded-sm bg-black p-4">
          <FaSearch />
        </button>
      </form>
      <div className="ml-4 bg-white p-2 rounded-sm  shadow-md">
        <span className='font-montserratLight'>Current weather information: Below</span>
      </div>
    </div>
  );
};

export default SearchBarView2;