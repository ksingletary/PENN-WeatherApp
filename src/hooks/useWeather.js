import { useState } from 'react';
import { getWeather, getForecast } from '../services/weatherService';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
      const forecastData = await getForecast(city);
      setForecast(forecastData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    }
  };

  return { weather, forecast, error, fetchWeather };
};

export default useWeather;