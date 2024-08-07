import React, { useState } from 'react';

const IntroPage = ({ onCitySubmit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCitySubmit(city);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Enter your city</h2>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default IntroPage;