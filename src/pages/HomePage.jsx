import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ErrorMessage from '../components/ErrorMessage';
import useWeather from '../hooks/useWeather';
import WeatherDetails from '../components/WeatherDetails';

const HomePage = ({ initialCity }) => {
  const { weather, forecast, error, fetchWeather } = useWeather();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (initialCity) {
      fetchWeather(initialCity);
    }
  }, [initialCity, fetchWeather]);

  return (
    <div className={`min-h-[1023px] overflow-x-hidden ${isDarkMode ? 'bg-blackDarker text-white' : 'bg-white text-gray-900'} p-8`}>
      <Navbar
        initialCity={initialCity}
        locationName={weather?.location.name + `,${weather?.location.region}` || 'Location'}
        onFetchWeather={fetchWeather}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      {error && <ErrorMessage message={error} />}
      {weather && forecast ? (
        <WeatherDetails weather={weather} forecast={forecast} fetchWeather={fetchWeather} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default HomePage;