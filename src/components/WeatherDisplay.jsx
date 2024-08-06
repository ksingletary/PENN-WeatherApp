import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">{weather.location.name}</h2>
      <p className="text-lg">Temperature: {weather.current.temp_c}°C</p>
      <p className="text-lg">Weather: {weather.current.condition.text}</p>
    </div>
  );
};

export default WeatherDisplay;