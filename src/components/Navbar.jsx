import {useState} from 'react';
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { GoBell } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import WeatherForm from './WeatherForm';
import DarkModeToggle from './DarkModeToggle';
import GeolocationButton from './GeolocationButton';
import { IoNotifications } from "react-icons/io5";

const Navbar = ({initialCity, locationName, onFetchWeather, isDarkMode, toggleDarkMode }) => {
    const [open, setOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isNotiAnimating, setIsNotiAnimating] = useState(false);
    
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

    const handleNotiToggle = () => {
        if (notiOpen) {
          setIsNotiAnimating(true);
          setTimeout(() => {
            setNotiOpen(false);
            setIsNotiAnimating(false);
          }, 200);
        } else {
          setNotiOpen(true);
        }
    };

    const handleMouseLeave = function(e) {
        let target = e.relatedTarget;
    
        if (target && typeof target.closest === "function" && !target.closest(".navbar") && !target.closest(".expanded-navbar")) {
            setIsAnimating(true);
            setIsNotiAnimating(true);
            setTimeout(function() {
                setOpen(false);
                setNotiOpen(false);
                setIsAnimating(false);
                setIsNotiAnimating(false);
            }, 200);
        }
    };

  return (
    <nav className="navbar  w-[1392px] h-[50px] flex items-center justify-between bg-none text-white transition duration-300 ease-in-out z-30">
      <main className="flex items-center space-x-4">
        <button onClick={handleToggle} className={`bg-blackDark rounded-full flex items-center w-14 h-14 ${notiOpen ? "z-10" : "z-30"} flex-shrink-0`}>
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
                  <h1 className='text-4xl hover:text-blue-300 mt-6 text-center'>Home</h1>
                </Link>
              </div>
              <div className='flex flex-col mt-4'>
                <Link to='/weatherview1'>
                  <img src="/changeview.png" alt="view change" className='text-white'/>
                  <h1 className='text-4xl hover:text-blue-400 text-center mt-6'>View 1</h1>
                </Link>
              </div>
              <div className='flex flex-col mt-4'>
                <Link to='/weatherview2'>
                  <img src="/changeview.png" alt="view change" className="w-52 h-52 scale-x-[-1]" width="300"/>
                  <h1 className='text-4xl hover:text-blue-600 text-center mt-6'>View 2</h1>
                </Link>
              </div>
            </div>
          </div>
        )}
        <button onClick={handleNotiToggle} className={`bg-blackDark rounded-full flex items-center w-14 h-14 ${notiOpen ? "z-30" : "z-10"} flex-shrink-0`}>
          <GoBell className="text-customWhite2 text-xl w-6 h-6 ml-4" />
        </button>
        {(notiOpen || isNotiAnimating) && (
          <div
            onMouseLeave={handleMouseLeave}
            className={`expanded-navbar fixed z-20 outline outline-black top-0 h-full w-full p-0 bg-blackDark font-CaeciliaSemi text-white bg-opacity-75 backdrop-blur-md ${
              notiOpen && !isNotiAnimating ? "navbar-open" : "navbar-close"
            }`}
          >
            <div className='flex flex-col justify-center items-center h-screen'>
                  <IoNotifications className='w-52 h-52 mr-24' />
                  <h1 className='text-4xl hover:text-blue-300 mt-6 text-center mr-14'>No new notifications</h1>
            </div>
          </div>
        )}
        <header className="flex items-center text-customWhite2 z-10 flex-shrink-0">
          <SlLocationPin className="text-xl mr-2" />
          <span className='text-lg'>{locationName}</span>
        </header>

        <GeolocationButton onFetchWeather={onFetchWeather} />
        
      </main>

      <WeatherForm initialCity={initialCity} onFetchWeather={onFetchWeather} />

      <header className="flex items-center space-x-4 mb-4 z-10">
        <button onClick={toggleDarkMode} className="text-white text-xl flex-shrink-0">
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </button>
        <img src="/exampleprofile.jpg" alt="Profile" className="w-10 cursor-pointer h-10 rounded-full flex-shrink-0" />
      </header>
    </nav>
  );
};

export default Navbar;