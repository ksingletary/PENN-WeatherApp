import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeatherDetails from '../components/WeatherDetails';

const mockWeather = {
  current: {
    last_updated: 1625812800,
    temp_c: 25,
    condition: {
      text: "Sunny"
    },
    feelslike: 27,
    wind: 10,
    pressure: 1015,
    humidity: 50,
    uv: 5,
    dew_point: 16,
    vis_km: 10,
    co: 300,
    us_epa_index: 2,
  },
  location: {
    name: "New York",
    region: "NY",
    timezone: "America/New_York"
  }
};

const mockForecast = [
  {
    day: "Monday",
    temp: 29.5,
    description: "Clear sky",
    visibility: 10,
    conditionIcon: "/icons/sunny.png"
  },
  {
    day: "Tuesday",
    temp: 30.2,
    description: "Partly cloudy",
    visibility: 10,
    conditionIcon: "/icons/cloudy.png"
  },
  // Add other days if necessary
];

describe('WeatherDetails Component', () => {
  test('renders weather and forecast data correctly', () => {
    render(<WeatherDetails weather={mockWeather} forecast={mockForecast} fetchWeather={jest.fn()} />);

    // Check if location name is rendered
    expect(screen.getByText(/New York/)).toBeInTheDocument();

    // Check if temperature is rendered
    expect(screen.getByText(/\+25°/)).toBeInTheDocument();

    // Check if condition is rendered
    expect(screen.getByText(/Sunny/)).toBeInTheDocument();

    // Check if forecast day is rendered
    expect(screen.getByText(/Monday/)).toBeInTheDocument();

    // Check if Air quality is rendered
    expect(screen.getByText(/Air quality: 300 μg\/m³ - Moderate/)).toBeInTheDocument();
  });
});