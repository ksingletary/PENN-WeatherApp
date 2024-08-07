import React, { useEffect } from 'react';
import useWeather from '../hooks/useWeather';
import SearchBarView2 from '../components/SearchBarView2';
import Navbar from '../components/Navbar';

// Helper function to map EPA index to description
const getEpaDescription = (index) => {
  switch (index) {
    case 1: return "Good";
    case 2: return "Moderate";
    case 3: return "Unhealthy for sensitive group";
    case 4: return "Unhealthy";
    case 5: return "Very Unhealthy";
    case 6: return "Hazardous";
    default: return "Unknown";
  }
};

const WeatherView2 = ({ initialCity }) => {
  const { weather, forecast, error, fetchWeather } = useWeather();

  useEffect(() => {
    if (initialCity) {
      fetchWeather(initialCity);
    }
  }, [initialCity, fetchWeather]);

  if (!weather || !forecast) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar
            initialCity={initialCity}
            locationName={weather?.location.name + `,${weather?.location.region}` || 'Location'}
            onFetchWeather={fetchWeather}
        />
      <div className="bg-cover bg-center flex-grow flex flex-col items-center justify-center text-black p-8 pt-24" style={{ backgroundImage: 'url("/weatherview2.jpeg")' }}>
        <SearchBarView2 onFetchWeather={fetchWeather} />
        <div className="bg-white w-[808px] h-[406px] bg-opacity-90 border border-gray-300 rounded-md p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-bold mb-2">{weather.location.name} ({weather.location.region})</h2>
              <div className="text-gray-500">Local time: {new Date(weather.current.last_updated * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="flex items-center mt-4">
                    <div className="flex flex-col items-center">
                        <span className="text-6xl mr-16 text-black font-montserratMedium">+{weather.current.temp_c}°</span>
                        <span className="mt-5 text-sm">{weather.current.condition}, feels like {weather.current.feelslike}&deg;</span>
                    </div>
                    <img src={forecast[1].conditionIcon} alt="condition icon" className="mb-14 -ml-6" />
                </div>
            </div>
            <div className="text-right space-y-6 text-xl ">
              <div className='mb-4'>{forecast[1].day}</div>
              <div className="mt-2">Air quality: {weather.current.co} μg/m³ - {getEpaDescription(weather.current.us_epa_index)}</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>Wind Speed</span>
                <span>{weather.current.wind} km/h</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>Wind Gust</span>
                <span>{weather.current.wind} km/h</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>Humidity</span>
                <span>{weather.current.humidity}%</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>Precipitation Chance</span>
                <span>{forecast[1].hourlyRainChance[1].chance_of_rain}%</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>Visibility</span>
                <span>{forecast[1].visibility} km</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>Pressure</span>
                <span>{weather.current.pressure} mB</span>
            </div>
          </div>
        </div>

        <div className="bg-white w-[808px] h-[179px] bg-opacity-90 border border-gray-300 rounded-md p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Daily Forecast</h3>
            <div className="flex justify-between">
                {forecast.slice(0, 7).map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div>{day.temp}°</div>
                    <img src={day.conditionIcon} alt={day.description} className="w-8 h-8" />
                    <div>{day.day}</div>
                </div>
                ))}
            </div>
        </div>
      </div>
      <footer className="bg-lightGray bg-opacity-10  w-full py-4 flex justify-center space-x-44 items-center border-t border-gray-300 px-8">
        <span>Data source: https://www.weatherapi.com/</span>
        <span>GitHub: https://github.com/ksingletary/PENN-WeatherApp</span>
      </footer>
    </div>
  );
};

export default WeatherView2;