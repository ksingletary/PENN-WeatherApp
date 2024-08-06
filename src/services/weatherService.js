import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';

// Function to get current weather
export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get weather forecast
export const getForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5,  // Adjust the number of forecast days as needed
      },
    });
    return response.data.forecast.forecastday.map((item) => ({
      date: item.date,
      temp: item.day.avgtemp_c,
      description: item.day.condition.text,
    }));
  } catch (error) {
    throw error;
  }
};