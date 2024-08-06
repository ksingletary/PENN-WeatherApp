import React from 'react';

const Forecast = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold">Forecast</h2>
      {forecast.map((day, index) => (
        <div key={index} className="text-center">
          <p>{day.date}: {day.temp}°C - {day.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;