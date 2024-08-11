import {useState, useEffect} from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import AirQualityToggle from './AirQualityToggle';
import CityList from './CityList';
import RainChart from './RainChart';
import ChangeTempScale from './ChangeTempScale';
import { IoIosClose } from "react-icons/io";

const WeatherDetails = ({weather, forecast, fetchWeather}) => {
    const [selectedDay, setSelectedDay] = useState("Next 7 Days");
    const [scale, setScale] = useState("temp_f");
    const [displayMode, setDisplayMode] = useState('Forecast');
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => setShowAll(!showAll);

    const handleScaleChange = (newScale) => {
        setScale(newScale);
    }

    const handleDayChange = (newDay) => {
        setSelectedDay(newDay);
    }

    const handleDisplayModeChange = (mode) => {
        setDisplayMode(mode);
    }

    const getSelectedDayIndex = () => {
        switch (selectedDay) {
            case "Today":
                return 1;
            case "Tomorrow":
                return 2;
            default:
                return 1; // defaulted to today
        }
    }

    const selectedDayIndex = getSelectedDayIndex();
    const selectedDayForecast = forecast[selectedDayIndex];
    
    const localTime = new Date(weather.current.last_updated * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: weather.location.timezone,
    });

    const getDisplayValue = (dayForecast) => {
        if (displayMode === 'Forecast') {
            return scale === "temp_f" ? dayForecast.temp_f : dayForecast.temp_c;
        } else {
            return Math.round(dayForecast.co); 
        }
    }

    const getDisplayUnit = () => {
        if (displayMode === 'Forecast') {
            return '°';
        } else {
            return ' μg/m³'; // units for carbon monoxide
        }
    }

    useEffect(() => {
        if (showAll) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
    
        return () => {
          document.body.classList.remove('no-scroll');
        };
      }, [showAll]);
    

  return (
    <main className='w-full md:-mt-10 lg:-mt-10'>
            <section className='w-full pt-16 flex justify-between'>
                <header className='flex space-x-3'>
                    <button 
                        className={`text-xl ${selectedDay === "Today" ? 'text-white' : 'text-lightGray hover:text-white'}`}
                        onClick={() => handleDayChange("Today")}
                    >
                        Today
                    </button>
                    <button 
                        className={`text-xl ${selectedDay === "Tomorrow" ? 'text-white' : 'text-lightGray hover:text-white'}`}
                        onClick={() => handleDayChange("Tomorrow")}
                    >
                        Tomorrow
                    </button>
                    <button 
                        className={`text-xl ${selectedDay === "Next 7 Days" ? 'text-white' : 'text-lightGray hover:text-white'}`}
                        onClick={() => handleDayChange("Next 7 Days")}
                    >
                        Next 7 Days
                    </button>
                </header>
                <ChangeTempScale onScaleChange={handleScaleChange} />
                <header className='flex space-x-6 mr-40'>
                    <AirQualityToggle active={displayMode} onToggle={handleDisplayModeChange} />
                    <h1 className='text-xl text-white'>Chance Of Rain</h1>
                </header>
            </section>
            <section className="pt-7 text-white max-w-full ">
                <article className="flex flex-col md:flex-row lg:flex-row xsm:flex-col xsm: lg:space-y-0 lg:space-x-6">
                    <section className={`flex-none xsm:flex xsm:flex-col xsm:-space-y-10 md:-space-y-0 ${selectedDay !== "Next 7 Days" ? 'w-full lg:w-[400px] h-[300px]' :
                     'w-full xsm:w-[650px] xsm:h-[500px] md:w-[257px] md:h-[226px] lg:w-[257px] h-[226px]'}
                     xsm:w-1/4 md:mt-6 md:w-1/4 bg-temperatureToday rounded-3xl overflow-hidden transition-all duration-300`}>
                        <div className="flex xsm:flex  md:flex text-blackDark2 bg-temperatureToday2 rounded-t-3xl justify-between xsm:justify-between  p-4">
                            <span className='xsm:text-4xl md:text-lg'>{selectedDayForecast.day}</span>
                            <span className='xsm:text4xl md:text-lg'>{localTime}</span>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <div className='ml-2'>
                                <span className={`font-montserratBold text-blackDark2 ${selectedDay !== "Next 7 Days" ? "md:text-5xl lg:text-5xl" : null}  xsm:text-9xl sm:text-7xl md:text-4xl text-4xl`}>
                                    {getDisplayValue(selectedDayForecast)}
                                    {getDisplayUnit()}
                                </span>
                            </div>
                            <img src={selectedDayForecast.conditionIcon} alt="condition icon" className={`${selectedDay !== "Next 7 Days" ? "md:w-20 md:h-20 " : null} xsm:w-60 xsm:h-60 md:w-16 md:h-16 mr-4'`} />
                        </div>
                        <div className="flex flex-row xsm:text-4xl sm:text-3xl md:text-xs text-xs ml-4">
                            <div className={`flex flex-col space-y-1 ${selectedDay !== "Next 7 Days" ? "md:text-lg" : null}`}>
                                <span className="text-lightGray">Real Feel <span className='font-montserratMedium text-blackDark'>
                                    {scale === "temp_f" 
                                        ? (selectedDay === "Tomorrow" ? forecast[2].hourlyRainChance[2].feelslike_f : weather.current.feelslike_f)
                                        : (selectedDay === "Tomorrow" ? forecast[2].hourlyRainChance[2].feelslike_c : weather.current.feelslike_c)}&deg;
                                </span></span>
                                <span className='text-lightGray'>Wind N-E. <span className='font-montserratMedium text-blackDark'>{selectedDay === "Tomorrow" ? forecast[2].maxwind : weather.current.wind} km/h</span></span>
                                <span className='text-lightGray'>Pressure <span className='font-montserratMedium text-blackDark'>{selectedDay === "Tomorrow" ? forecast[2].hourlyRainChance[2].pressure : weather.current.pressure}MB</span></span>
                                <span className='text-lightGray'>Humidity <span className='font-montserratMedium text-blackDark'>{selectedDay === "Tomorrow" ? forecast[2].humidity : weather.current.humidity}%</span></span>
                            </div>
                            <div className={`flex flex-col ${selectedDay !== "Next 7 Days" ? "md:text-lg lg:text-lg" : null} ml-6 mt-5 space-y-1`}>
                                <span className='text-lightGray'>Sunrise <span className='font-montserratMedium text-blackDark'>5:30AM</span></span>
                                <span className='text-lightGray'>Sunset <span className='font-montserratMedium text-blackDark'>6:45pm</span></span>
                            </div>
                        </div>
                    </section>

                    {selectedDay === "Next 7 Days" && (
                        <section className="flex-grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:space-x-3 lg:grid-cols-7 lg:gap-28">
                            {[2, 3, 4, 5, 6, 0].map((index) => (
                                <div key={index} className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                                    <div>{forecast[index].day}</div>
                                    <div className="h-px w-full bg-lighterGray my-2"></div>
                                    <div className='mt-9 space-y-11'>
                                        <img src={forecast[index].conditionIcon} alt="condition icon" className='w-16 h-16 ml-4' />
                                        <div className="text-2xl">
                                            {getDisplayValue(forecast[index])}
                                            {getDisplayUnit()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    <div className="flex-none w-full md:w-1/4 lg:w-auto bg-transparent p-4 rounded-lg">
                        <RainChart city={weather.location.name} />
                    </div>
                </article>
            </section>
            <section className='w-full pt-7 flex justify-between'>
                <header className='flex space-x-3'>
                    <p className='text-xl text-lightGray'>
                        {selectedDay === "Next 7 Days" ? "Today" : selectedDay}'s Overview
                    </p>
                </header>
                <header className='relative flex space-x-36'>
                    <h1 className='text-base text-white mr-4'>Other Cities</h1>
                    <button onClick={toggleShowAll} className='font-montserratLight hover:text-lightGray text-sm'>See More</button>
                </header>
                {showAll && (
                    <div className="fixed z-30 inset-0 bg-black bg-opacity-75 flex justify-end items-center">
                        <div className="bg-temperatureToday2 p-6 rounded-lg shadow-lg mt-20 w-1/2 h-4/5 relative">
                            <button
                                onClick={toggleShowAll}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                <IoIosClose className="w-12 h-12 text-black hover:text-white" />
                            </button>
                            <h2 className="text-lg mb-4 text-blackDark">All Cities</h2>
                            <div className="grid gap-4">
                                <CityList showAll={true} onCityClick={(city) => {
                                    fetchWeather(city);
                                    toggleShowAll();
                                }} />
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <section id='thissec' className="pt-6 flex md:flex-row sm:flex-col text-white">
                <article className="grid grid-cols-1 md:space-x-32 md:grid-cols-3 lg:grid-cols-3 lg:space-x-36 gap-6 lg:gap-0">
                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 pr-20">
                        {/* Wind Status */}
                        <div className="bg-blackDark3 space-y-11 w-[290px] h-[245px] p-4 rounded-3xl">
                            <div className="text-xl mb-4">Wind Status</div>
                            <img src="/WindStatusIcon.png" alt="wind status" className='' />
                            <div className="flex justify-between items-end">
                                <div className="text-sm font-montserratMedium">
                                    {selectedDay === "Tomorrow" ? forecast[2].maxwind : weather.current.wind} 
                                    <span className="text-sm font-montserratLight">km/h</span>
                                </div>
                                <div className="text-sm text-white">{localTime}</div>
                            </div>
                        </div>

                        {/* UV Index */}
                        <div className="bg-blackDark3 space-y-0 w-[290px] h-[245px] p-4 rounded-3xl ml-20">
                            <div className="text-xl mb-4">UV Index</div>
                            <img src="/UVIndex.png" alt="uv index" className='ml-16 w-32 h-32' />
                            <div className="flex justify-center">
                                <div className="text-xl font-montserratMedium">
                                    {selectedDay === "Tomorrow" ? forecast[2].uv : weather.current.uv} 
                                    <span className="text-xl font-montserratLight">UV</span>
                                </div>
                            </div>
                        </div>

                        {/* Humidity */}
                        <div className="bg-blackDark3 space-y-7 w-[290px] h-[245px] p-4 rounded-3xl">
                            <div className="text-xl mb-4">Humidity</div>
                            <img src="/carbon_humidity.png" alt="humidity" className='ml-20 w-22 h-22' />
                            <div className="flex justify-between items-end">
                                <div className="text-lg mb-2">
                                    {selectedDay === "Tomorrow" ? forecast[2].humidity : forecast[1].humidity}%
                                </div>
                                <div className='flex flex-row -space-x-0 pl-5 ml-5'>
                                    <img src="/humidity_icon.png" alt="humidity" className=' w-6 h-6' />
                                    <div className="text-sm ml-3 text-gray-400">
                                        The dew point is {scale === "temp_f" 
                                            ? (selectedDay === "Tomorrow" ? forecast[2].hourlyRainChance[2].dew_point_f : weather.current.dew_point_f)
                                            : (selectedDay === "Tomorrow" ? forecast[2].hourlyRainChance[2].dew_point_c : weather.current.dew_point_c)}° right now
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="bg-blackDark3 space-y-5 w-[290px] h-[245px] p-4 rounded-3xl ml-20">
                            <div className="text-xl mb-4">Visibility</div>
                            <img src="/visibility_icon.png" alt="humidity" className='w-24 h-24 ml-20' />
                            <div className="flex justify-between space-x-10 items-end">
                                <div className="flex gap-2 text-xl mb-3 font-montserratMedium">
                                    {selectedDay === "Tomorrow" ? forecast[2].visibility : forecast[1].visibility}
                                    <span className="text-base mt-1"> km</span>
                                </div>
                                <div className="text-sm pl-4 text-gray-400 flex items-center">
                                    <AiOutlineEye className="mr-1 mb-5 w-6 h-6 " /> 
                                    {selectedDay === "Tomorrow" ? forecast[2].condition : forecast[1].condition}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Global Map */}
                    <section className="col-span-1 bg-blackDark3 w-[400px] h-[520px] p-4 rounded-3xl flex flex-col justify-center relative">
                        <img src="/CityImage.png" alt="Global Map" className="absolute brightness-50 inset-0 w-full h-full object-cover rounded-3xl z-0" />
                        <div className="flex-grow z-10 p-4 space-y-60">
                            <div className="w-[363px] h-[68px] text-xl bg-customWhite3 text-black font-montserratBold mt-10 -ml-3 p-4 shadow-xl rounded-xl overflow-hidden leading-tight">
                                Explore global map of wind, weather and ocean condition
                            </div>
                            <button className="bg-white w-[266px] h-[80px] text-black text-2xl px-4 py-2 ml-7 hover:bg-lightGray rounded-xl">
                                <a href="https://earth.nullschool.net/" target="_blank" rel="noopener noreferrer">Get Started</a>
                            </button>
                        </div>
                    </section>

                    {/* Other Cities */}
                    <CityList showAll={showAll} onCityClick={fetchWeather} />
                </article>
            </section>
    </main>   
    
  )
}

export default WeatherDetails