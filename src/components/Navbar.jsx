// src/components/Navbar.jsx
import React from 'react';
import {FaMoon, FaSun } from 'react-icons/fa';
import { SlLocationPin } from "react-icons/sl";
import { GoBell } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import WeatherForm from './WeatherForm';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({initialCity, locationName, onFetchWeather, isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="absolute top-6 left-6 w-[1392px] h-[50px] flex items-center justify-between bg-none text-white transition duration-300 ease-in-out z-1000">
      <div className="flex items-center space-x-4">
        <div className='bg-blackDark rounded-full flex items-center w-14 h-14'>
            <RxDashboard className="text-customWhite2 text-xl w-6 h-6 ml-4" />
        </div>
        <div className='bg-blackDark rounded-full flex items-center w-14 h-14'>
            <GoBell className="text-customWhite2 text-xl w-6 h-6 ml-4" />
        </div>
        <div className="flex items-center text-customWhite2">
          <SlLocationPin className="text-xl mr-2" />
          <span>{locationName}</span>
        </div>
      </div>
      <WeatherForm initialCity={initialCity} onFetchWeather={onFetchWeather} />
      <div className="flex items-center space-x-4 mb-4">
        <button onClick={toggleDarkMode} className="text-white text-xl">
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </button>
        <img src="/exampleprofile.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </nav>
  );
};

export default Navbar;