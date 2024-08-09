import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

// Helper function to make API requests
const makeRequest = async (endpoint, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: { key: API_KEY, aqi: 'yes', ...params }, // aqi is air quality index
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
        temp_f: data.current.temp_f,
        condition: data.current.condition.text,
        last_updated: data.current.last_updated_epoch,
        feelslike_c: data.current.feelslike_c,
        feelslike_f: data.current.feelslike_f,
        wind: data.current.wind_kph,
        pressure: data.current.pressure_mb,
        humidity: data.current.humidity,
        dew_point_c: data.current.dewpoint_c,
        dew_point_f: data.current.dewpoint_f,
        uv: data.current.uv,
        co: data.current.air_quality.co,
        us_epa_index: data.current.air_quality['us-epa-index'],
      },
      location: {
        name: data.location.name,
        country: data.location.country,
        region: data.location.region,
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
      day: getDayOfWeek(item.date), // day of the week
      temp_c: item.day.avgtemp_c,
      temp_f: item.day.avgtemp_f,
      description: item.day.condition.text,
      visibility: item.day.avgvis_km,
      condition: item.day.condition.text,
      conditionIcon: item.day.condition.icon,
      co: data.current.air_quality.co, 
      us_epa_index: data.current.air_quality['us-epa-index'],
      hourlyRainChance: item.hour.map(hour => ({
        time: hour.time,
        chance_of_rain: hour.chance_of_rain,
      })),
    }));
  } catch (error) {
    throw error;
  }
};

