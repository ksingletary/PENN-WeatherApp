import React from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import AirQualityToggle from './AirQualityToggle';
import CityList from './CityList';
import RainChart from './RainChart';

const WeatherDetails = ({weather, forecast, fetchWeather}) => {
    
    const localTime = new Date(weather.current.last_updated * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: weather.location.timezone,
    });

  return (
    <>
        <div className='w-full pt-16 flex justify-between'>
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
        <div className="pt-7 text-white max-w-full overflow-x-hidden">
            {/* Weather Details */}
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Current Day Details */}
                <div className="flex-none w-full lg:w-[257px] h-[226px] bg-temperatureToday rounded-3xl overflow-hidden">
                    <div className="flex text-blackDark2 bg-temperatureToday2 rounded-t-3xl justify-between items-center p-4">
                        <span>{forecast[1].day}</span>
                        <span>{localTime}</span>
                    </div>
                    <div className="flex items-center justify-between p-2">
                        <div className='ml-2'>
                            <span className="font-montserratBold text-blackDark2 text-4xl">{weather.current.temp_c}&deg;</span>
                        </div>
                        <img src={forecast[1].conditionIcon} alt="condition icon" className='w-16 h-16 mr-4' />
                    </div>
                    <div className="flex flex-row text-xs ml-4">
                        <div className='flex flex-col space-y-1'>
                            <span className="text-lightGray">Real Feel <span className='font-montserratMedium text-blackDark'>{weather.current.feelslike}</span></span>
                            <span className='text-lightGray'>Wind N-E. <span className='font-montserratMedium text-blackDark'>{weather.current.wind}km/h</span></span>
                            <span className='text-lightGray'>Pressure <span className='font-montserratMedium text-blackDark'>{weather.current.pressure}MB</span></span>
                            <span className='text-lightGray'>Humidity <span className='font-montserratMedium text-blackDark'>{weather.current.humidity}%</span></span>
                        </div>
                        <div className='flex flex-col ml-6 mt-5 space-y-1'>
                            <span className='text-lightGray'>Sunrise <span className='font-montserratMedium text-blackDark'>5:30AM</span></span>
                            <span className='text-lightGray'>Sunset <span className='font-montserratMedium text-blackDark'>6:45pm</span></span>
                        </div>
                    </div>
                </div>

                {/* Upcoming Days */}
                <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>{forecast[2].day}</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <img src={forecast[2].conditionIcon} alt="condition icon" className='w-16 h-16 ml-4' />
                            <div className="text-3xl">{forecast[2].temp}&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>{forecast[3].day}</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <img src={forecast[3].conditionIcon} alt="condition icon" className='w-16 h-16 ml-4' />
                            <div className="text-3xl">{forecast[3].temp}&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>{forecast[4].day}</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <img src={forecast[4].conditionIcon} alt="condition icon" className='w-16 h-16 ml-4' />
                            <div className="text-3xl">{forecast[4].temp}&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>{forecast[5].day}</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <img src={forecast[5].conditionIcon} alt="condition icon" className='w-16 h-16 ml-4' />
                            <div className="text-3xl">{forecast[5].temp}&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>{forecast[6].day}</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <img src={forecast[6].conditionIcon} alt="condition icon" className='w-16 h-16 ml-4' />
                            <div className="text-3xl">{forecast[6].temp}&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>{forecast[0].day}</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <img src={forecast[0].conditionIcon} alt="condition icon" className='w-16 h-16 ml-4' />
                            <div className="text-3xl">{forecast[0].temp}&deg;</div>
                        </div>
                    </div>
                </div>

                {/* Chance of Rain */}
                <RainChart city={weather.location.name} />
            </div>
        </div>
        <div className='w-full pt-7 flex justify-between'>
            <div className='flex space-x-3'>
                <p className='text-xl text-lightGray'>Today's Overview</p>
            </div>
            <div className='flex space-x-36'>
                <h1 className='text-base text-white mr-4'>Other Cities</h1>
                <button className='font-montserratLight hover:text-lightGray text-sm'>See All</button>
            </div>
        </div>
        <div className="pt-6 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:space-x-44 gap-6">
                {/* 2x2 Grid for Wind Status, UV Index, Humidity, and Visibility */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Wind Status */}
                    <div className="bg-blackDark3 space-y-11 w-[290px] h-[245px] p-4 rounded-3xl">
                        <div className="text-xl mb-4">Wind Status</div>
                        <img src="/WindStatusIcon.png" alt="wind status" className='' />
                        <div className="flex justify-between items-end">
                            <div className="text-sm font-montserratMedium">{weather.current.wind} <span className="text-sm font-montserratLight">km/h</span></div>
                            <div className="text-sm text-white">{localTime}</div>
                        </div>
                    </div>

                    {/* UV Index */}
                    <div className="bg-blackDark3 space-y-0 w-[290px] h-[245px] p-4 rounded-3xl ml-20">
                        <div className="text-xl mb-4">UV Index</div>
                        <img src="/UVIndex.png" alt="uv index" className='ml-16 w-32 h-32' />
                        <div className="flex justify-center">
                            <div className="text-xl font-montserratMedium">{weather.current.uv} <span className="text-xl font-montserratLight">UV</span></div>
                        </div>
                    </div>

                    {/* Humidity */}
                    <div className="bg-blackDark3 space-y-7 w-[290px] h-[245px] p-4 rounded-3xl">
                        <div className="text-xl mb-4">Humidity</div>
                        <img src="/carbon_humidity.png" alt="humidity" className='ml-20 w-22 h-22' />
                        <div className="flex justify-between items-end">
                            <div className="text-lg mb-2">{weather.current.humidity}%</div>
                            <div className='flex flex-row -space-x-0 pl-5 ml-5'>
                                <img src="/humidity_icon.png" alt="humidity" className=' w-6 h-6' />
                                <div className="text-sm ml-3 text-gray-400">The dew point is {weather.current.dew_point}° right now</div>
                            </div>
                            
                        </div>
                    </div>

                    {/* Visibility */}
                    <div className="bg-blackDark3 space-y-5 w-[290px] h-[245px] p-4 rounded-3xl ml-20">
                        <div className="text-xl mb-4">Visibility</div>
                        <img src="/visibility_icon.png" alt="humidity" className='w-24 h-24 ml-20' />
                        <div className="flex justify-between space-x-10 items-end">
                            <div className="flex gap-2 text-xl mb-3 font-montserratMedium">{forecast[1].visibility}<span className="text-base mt-1"> km</span></div>
                            <div className="text-sm pl-4 text-gray-400 flex items-center">
                                <AiOutlineEye className="mr-1 mb-5 w-6 h-6 " /> {forecast[1].condition}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Map */}
                <div className="col-span-1 bg-blackDark3 w-[400px] h-[520px] p-4 rounded-3xl flex flex-col justify-center relative">
                    <img src="/CityImage.png" alt="Global Map" className="absolute brightness-50 inset-0 w-full h-full object-cover rounded-3xl z-0" />
                    <div className="flex-grow z-10 p-4 space-y-60">
                        <div className="w-[363px] h-[68px] text-xl bg-customWhite3 text-black font-montserratBold mt-10 -ml-3 p-4 shadow-xl rounded-xl overflow-hidden leading-tight">
                            Explore global map of wind, weather and ocean condition
                        </div>
                        <button className="bg-white w-[266px] h-[80px] text-black text-2xl px-4 py-2 ml-7 hover:bg-lightGray rounded-xl">Get Started</button>
                    </div>
                </div>

                {/* Other Cities */}
                <CityList onCityClick={fetchWeather} />
            </div>
        </div>
    </>   
    
  )
}

export default WeatherDetails