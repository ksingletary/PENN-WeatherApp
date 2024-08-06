import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WeatherDisplay from '../components/WeatherDisplay';
import ErrorMessage from '../components/ErrorMessage';
import Forecast from '../components/Forecast';
import useWeather from '../hooks/useWeather';
import AirQualityToggle from '../components/AirQualityToggle';

const HomePage = () => {
    const { weather, forecast, error, fetchWeather } = useWeather();
    const [isDarkMode, setIsDarkMode] = useState(() => {
      // Retrieve the saved theme from local storage if available
      const savedTheme = localStorage.getItem('darkMode');
      return savedTheme ? JSON.parse(savedTheme) : true;
    });
  
    const toggleDarkMode = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };
  
    useEffect(() => {
      // Save the theme to local storage
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      // Apply or remove the dark mode class on the document element
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [isDarkMode]);
  
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-blackDarker text-white' : 'bg-white text-gray-900'} p-8`}>
        <Navbar
          locationName={weather?.location.name + `,${weather?.location.country}` || 'Location'}
          onFetchWeather={fetchWeather}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        {error && <ErrorMessage message={error} />}
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            <WeatherDisplay weather={weather} />
          </div>
          <div className="lg:col-span-2">
            <Forecast forecast={forecast} />
          </div>
        </main>

        <div className='w-full pt-11 flex justify-between'>
            <div className='flex space-x-3'>
                <button className='text-xl text-lightGray'>Today</button>
                <button className='text-xl text-lightGray'>Tomorrow</button>
                <button className='text-xl text-white'>Next 7 Days</button>
            </div>
            <div className='flex space-x-6 mr-40'>
                <AirQualityToggle />
                <h1 className='text-xl text-white'>Chance Of Rain</h1>
            </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;