import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';

// Helper function to make API requests
const makeRequest = async (endpoint, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: { key: API_KEY, ...params },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Weather API error: ${error.response.data.error.message}`);
    } else if (error.request) {
      throw new Error('No response received from Weather API');
    } else {
      throw new Error('Error setting up request to Weather API');
    }
  }
};

// Function to get the day of the week
const getDayOfWeek = (dateString) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
};

// Function to get current weather
export const getWeather = async (city) => {
  try {
    const data = await makeRequest('current.json', { q: city });
    return {
      current: {
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
        last_updated: data.current.last_updated_epoch,
        feelslike: data.current.feelslike_c,
        wind: data.current.wind_kph,
        pressure: data.current.pressure_mb,
        humidity: data.current.humidity,
        dew_point: data.current.dewpoint_c,
        uv: data.current.uv,
      },
      location: {
        name: data.location.name,
        country: data.location.country,
        timezone: data.location.tz_id, 
      },
    };
  } catch (error) {
    throw error;
  }
};

// Function to get weather forecast
export const getForecast = async (city, days = 7) => {
  try {
    const data = await makeRequest('forecast.json', { q: city, days });
    return data.forecast.forecastday.map((item) => ({
      date: item.date,
      day: getDayOfWeek(item.date), // Include the day of the week
      temp: item.day.avgtemp_c,
      description: item.day.condition.text,
      visibility: item.day.avgvis_km,
      condition: item.day.condition.text,
    }));
  } catch (error) {
    throw error;
  }
};

// Function to get current weather and forecast
export const getWeatherAndForecast = async (city, days = 5) => {
  const currentData = await getWeather(city);
  const forecastData = await getForecast(city, days);
  return {
    current: currentData.current,
    location: currentData.location,
    forecast: forecastData,
  };
};