import React from 'react'
import { IoIosPartlySunny } from "react-icons/io";
import { AiOutlineEye } from 'react-icons/ai';
import AirQualityToggle from './AirQualityToggle';
import useWeather from '../hooks/useWeather';

const WeatherDetails = ({weather, forecast}) => {
    if (!weather || !forecast) {
        return <div>Loading...</div>;
      }
      
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
                        <span>{forecast[0].day}</span>
                        <span>11:45 AM</span>
                        {/* <span>{new Date(current.last_updated_epoch * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                        <span>{new Date(current.last_updated_epoch * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span> */}
                    </div>
                    <div className="flex items-center justify-between p-2">
                        <div className='ml-2'>
                            <span className="font-montserratBold text-blackDark2 text-4xl">{weather?.current.temp_c}&deg;</span>
                        </div>
                        <div>
                            <IoIosPartlySunny className='w-16 h-14 text-yellow-500 mr-3' />
                        </div>
                    </div>
                    <div className="flex flex-row text-xs ml-4">
                        <div className='flex flex-col space-y-1'>
                            <span className="text-lightGray">Real Feel <span className='font-montserratMedium text-blackDark'>18&deg;</span></span>
                            <span className='text-lightGray'>Wind N-E. <span className='font-montserratMedium text-blackDark'>6-7km/h</span></span>
                            <span className='text-lightGray'>Pressure <span className='font-montserratMedium text-blackDark'>100MB</span></span>
                            <span className='text-lightGray'>Humidity <span className='font-montserratMedium text-blackDark'>51%</span></span>
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
                        <div>SAT</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <IoIosPartlySunny className='w-12 h-12 ml-5'/>
                            <div className="text-3xl">10&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>SAT</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <IoIosPartlySunny className='w-12 h-12 ml-5'/>
                            <div className="text-3xl">10&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>SAT</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <IoIosPartlySunny className='w-12 h-12 ml-5'/>
                            <div className="text-3xl">10&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>SAT</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <IoIosPartlySunny className='w-12 h-12 ml-5'/>
                            <div className="text-3xl">10&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>SAT</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <IoIosPartlySunny className='w-12 h-12 ml-5'/>
                            <div className="text-3xl">10&deg;</div>
                        </div>
                    </div>
                    <div className="bg-blackDark3 w-24 pt-2 rounded-3xl text-center">
                        <div>SAT</div>
                        <div className="h-px w-full bg-lighterGray my-2"></div>
                        <div className='mt-9 space-y-11'>
                            <IoIosPartlySunny className='w-12 h-12 ml-5'/>
                            <div className="text-3xl">10&deg;</div>
                        </div>
                    </div>
                </div>

                {/* Chance of Rain */}
                <div className="flex-none w-full lg:w-auto bg-gray-800 p-4 rounded-lg">
                    <h1 className="text-center mb-4">Chance of Rain</h1>
                    <div className="flex items-end space-x-2">
                        <div className="flex flex-col items-center">
                            <div className="w-4 h-16 bg-blue-500"></div>
                            <div className="text-sm mt-2">10AM</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-4 h-20 bg-blue-500"></div>
                            <div className="text-sm mt-2">11AM</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-4 h-24 bg-blue-500"></div>
                            <div className="text-sm mt-2">12PM</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-4 h-16 bg-blue-500"></div>
                            <div className="text-sm mt-2">1PM</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-4 h-12 bg-blue-500"></div>
                            <div className="text-sm mt-2">2PM</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-4 h-8 bg-blue-500"></div>
                            <div className="text-sm mt-2">3PM</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full pt-7 flex justify-between'>
            <div className='flex space-x-3'>
                <p className='text-xl text-lightGray'>Today's Overview</p>
            </div>
            <div className='flex space-x-36'>
                <h1 className='text-base text-white mr-4'>Other Cities</h1>
                <p className='font-montserratLight text-sm'>See All</p>
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
                            <div className="text-sm font-montserratMedium">7.50 <span className="text-sm font-montserratLight">km/h</span></div>
                            <div className="text-sm text-white">6.20 AM</div>
                        </div>
                    </div>

                    {/* UV Index */}
                    <div className="bg-blackDark3 space-y-0 w-[290px] h-[245px] p-4 rounded-3xl ml-20">
                        <div className="text-xl mb-4">UV Index</div>
                        <img src="/UVIndex.png" alt="uv index" className='ml-16 w-32 h-32' />
                        <div className="flex justify-center">
                            <div className="text-xl font-montserratMedium">5.50 <span className="text-xl font-montserratLight">UV</span></div>
                        </div>
                    </div>

                    {/* Humidity */}
                    <div className="bg-blackDark3 space-y-7 w-[290px] h-[245px] p-4 rounded-3xl">
                        <div className="text-xl mb-4">Humidity</div>
                        <img src="/carbon_humidity.png" alt="humidity" className='ml-20 w-22 h-22' />
                        <div className="flex justify-between items-end">
                            <div className="text-lg mb-2">84%</div>
                            <div className='flex flex-row -space-x-0 pl-5 ml-5'>
                                <img src="/humidity_icon.png" alt="humidity" className=' w-6 h-6' />
                                <div className="text-sm ml-3 text-gray-400">The dew point is 27° right now</div>
                            </div>
                            
                        </div>
                    </div>

                    {/* Visibility */}
                    <div className="bg-blackDark3 space-y-5 w-[290px] h-[245px] p-4 rounded-3xl ml-20">
                        <div className="text-xl mb-4">Visibility</div>
                        <img src="/visibility_icon.png" alt="humidity" className='w-24 h-24 ml-20' />
                        <div className="flex justify-between space-x-10 items-end">
                            <div className="flex gap-2 text-xl mb-3 font-montserratMedium">04<span className="text-base mt-1"> km</span></div>
                            <div className="text-sm pl-4 text-gray-400 flex items-center">
                                <AiOutlineEye className="mr-1 mb-5 w-6 h-6 " /> Haze is affecting visibility
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Map */}
                <div className="col-span-1 bg-blackDark3 w-[400px] h-[520px] p-4 rounded-3xl flex flex-col justify-between">
                    <div className="flex-grow">
                        <img src="path/to/global-map-image.jpg" alt="Global Map" className="w-full h-2/3 rounded-lg mb-4 object-cover" />
                    </div>
                    <div>
                        <div className="text-lg mb-4">Explore global map of wind, weather and ocean condition</div>
                        <button className="bg-white text-black px-4 py-2 rounded-full">Get Started</button>
                    </div>
                </div>

                {/* Other Cities */}
                <div className="col-span-1 ">
                    <div className="grid gap-7">
                        {/* Each city */}
                        <div className="bg-blackDark3 w-[297px] h-[110px] p-4 rounded-3xl flex justify-between items-center">
                            <div>
                                <div className="text-lg">Beijing</div>
                                <div className="text-sm text-gray-400">Cloudy</div>
                            </div>
                            <IoIosPartlySunny className="w-8 h-8 text-yellow-500" />
                        </div>
                        <div className="bg-blackDark3 w-[297px] h-[110px] p-4 rounded-3xl flex justify-between items-center">
                            <div>
                                <div className="text-lg">California</div>
                                <div className="text-sm text-gray-400">Windy</div>
                            </div>
                            <IoIosPartlySunny className="w-8 h-8 text-yellow-500" />
                        </div>
                        <div className="bg-blackDark3 w-[297px] h-[110px] p-4 rounded-3xl flex justify-between items-center">
                            <div>
                                <div className="text-lg">Arab Emirates</div>
                                <div className="text-sm text-gray-400">Mostly Sunny</div>
                            </div>
                            <IoIosPartlySunny className="w-8 h-8 text-yellow-500" />
                        </div>
                        <div className="bg-blackDark3 w-[297px] h-[110px] p-4 rounded-3xl flex justify-between items-center">
                            <div>
                                <div className="text-lg">Charlottetown</div>
                                <div className="text-sm text-gray-400">Light SnowShower</div>
                            </div>
                            <IoIosPartlySunny className="w-8 h-8 text-yellow-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>   
    
  )
}

export default WeatherDetails