import { useState, useCallback } from 'react';
import { getWeather, getForecast } from '../services/weatherService';

const getDayOfWeek = (dateString) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
};

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
      
      const forecastData = await getForecast(city);
      const forecastWithDays = forecastData.map((item) => ({
        ...item,
        day: getDayOfWeek(item.date),
      }));
      
      setForecast(forecastWithDays);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    }
  }, []);

  return { weather, forecast, error, fetchWeather };
};

export default useWeather;