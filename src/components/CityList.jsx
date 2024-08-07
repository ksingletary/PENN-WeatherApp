import React from 'react';
import { IoIosPartlySunny } from "react-icons/io";
import useWeather from '../hooks/useWeather';

const CityWeatherButton = ({ city, weatherDescription, icon: Icon, onCityClick }) => (
  <div
    className="bg-blackDark3 hover:bg-lighterGray w-[297px] h-[110px] p-4 rounded-3xl flex justify-between items-center cursor-pointer"
    onClick={() => onCityClick(city)}
  >
    <div>
      <div className="text-lg">{city}</div>
      <div className="text-sm text-gray-400">{weatherDescription}</div>
    </div>
    <Icon className="w-8 h-8 text-yellow-500" />
  </div>
);




const CityList = ({ onCityClick }) => {
    const { weather, forecast, error, fetchWeather } = useWeather();
  const cities = [
    { name: "Beijing", description: "Cloudy", icon: IoIosPartlySunny },
    { name: "California", description: "Windy", icon: IoIosPartlySunny },
    { name: "Arab Emirates", description: "Mostly Sunny", icon: IoIosPartlySunny },
    { name: "Charlottetown", description: "Light SnowShower", icon: IoIosPartlySunny },
  ];

  return (
    <div className="grid gap-7">
      {cities.map((city, index) => (
        <CityWeatherButton
          key={index}
          city={city.name}
          weatherDescription={city.description}
          icon={city.icon}
          onCityClick={onCityClick}
        />
      ))}
    </div>
  );
};

export default CityList;