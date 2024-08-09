import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ErrorMessage from '../components/ErrorMessage';
import useWeather from '../hooks/useWeather';
import WeatherDetails from '../components/WeatherDetails';
import Loading from '../components/Loading';

const HomePage = ({ initialCity }) => {
  const { weather, forecast, error, fetchWeather } = useWeather();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });
  const [loading, setLoading] = useState(false);


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
      setLoading(true);
      fetchWeather(initialCity).finally(() => setLoading(false));
    }
  }, [initialCity, fetchWeather]);

  if (loading) {
    return <Loading />;
  }


  return (
    <div className={`min-h-[1023px] overflow-x-hidden ${isDarkMode ? 'bg-blackDarker text-white' : 'bg-white text-gray-900'} p-8`}>
      <Navbar
        initialCity={initialCity}
        locationName={weather?.location.name + `,${weather?.location.region}` || 'Location'}
        onFetchWeather={fetchWeather}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {weather && forecast ? (
        <WeatherDetails weather={weather} forecast={forecast} fetchWeather={fetchWeather} />
      ) : (
        <>
       
        {error && <ErrorMessage message={error} />}
        </>
      )}
    </div>
  );
};

export default HomePage;