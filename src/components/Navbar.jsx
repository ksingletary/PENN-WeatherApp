import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { GoBell } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import WeatherForm from './WeatherForm';
import DarkModeToggle from './DarkModeToggle';
import GeolocationButton from './GeolocationButton';

const Navbar = ({initialCity, locationName, onFetchWeather, isDarkMode, toggleDarkMode }) => {
    const [open, setOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        if (open) {
          setIsAnimating(true);
          setTimeout(() => {
            setOpen(false);
            setIsAnimating(false);
          }, 200);
        } else {
          setOpen(true);
        }
      };

      const handleMouseLeave = function(e) {
        let target = e.relatedTarget;
    
        if (target && typeof target.closest === "function" && !target.closest(".navbar") && !target.closest(".expanded-navbar")) {
            setIsAnimating(true);
            setTimeout(function() {
                setOpen(false);
                setIsAnimating(false);
            }, 200);
        }
    };

  return (
    <nav className="navbar absolute top-6 left-6 w-[1392px] h-[50px] flex items-center justify-between bg-none text-white transition duration-300 ease-in-out">
      <div className="flex items-center space-x-4">
        <button onClick={handleToggle} className='bg-blackDark rounded-full flex items-center w-14 h-14 z-30'>
            <RxDashboard className="text-customWhite2 text-xl w-6 h-6 ml-4" />
        </button>
        {(open || isAnimating) && (
          <div
            onMouseLeave={handleMouseLeave}
            className={`expanded-navbar fixed z-20 outline outline-black top-0 h-full w-full p-0 bg-blackDark font-CaeciliaSemi text-white bg-opacity-75 backdrop-blur-md ${
              open && !isAnimating ? "navbar-open" : "navbar-close"
            }`}
          >
            <div className='flex justify-center items-center mt-48 gap-52'>
                <div className='flex flex-col'>
                    <Link to='/'>
                        <IoHomeSharp className='w-52 h-52' />
                    </Link>
                    <h1 className='text-4xl mt-6 text-center'>Home</h1>
                </div>
                <div>
                    <Link to='/weatherview1'>
                        <img src="/changeview.png" alt="view change" className='text-white'/>
                    </Link>
                    <h1 className='text-4xl text-center mt-6'>Change View</h1>
                </div>
            </div>
            
        </div>
        )}
        <div className='bg-blackDark rounded-full flex items-center w-14 h-14 z-10'>
            <GoBell className="text-customWhite2 text-xl w-6 h-6 ml-4" />
        </div>
        <div className="flex items-center text-customWhite2 z-10">
          <SlLocationPin className="text-xl mr-2" />
          <span>{locationName}</span>
        </div>
        <GeolocationButton onFetchWeather={onFetchWeather} />

      </div>
      <WeatherForm initialCity={initialCity} onFetchWeather={onFetchWeather} />
      
      <div className="flex items-center space-x-4 mb-4 z-10">
        <button onClick={toggleDarkMode} className="text-white text-xl">
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </button>
        <img src="/exampleprofile.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </nav>
  );
};

export default Navbar;