import { IoIosPartlySunny, IoIosCloud, IoIosSunny, IoIosRainy } from "react-icons/io";

const CityWeatherButton = ({ city, weatherDescription, icon: Icon, onCityClick }) => (
  <button
    className="bg-blackDark3 hover:bg-lighterGray w-[297px] h-[110px] space-x-20 p-4 rounded-3xl flex justify-between items-center cursor-pointer"
    onClick={() => onCityClick(city)}
  >
    <header>
      <h1 className="text-lg">{city}</h1>
      <p className="text-sm text-gray-400">{weatherDescription}</p>
    </header>
    <Icon className="w-8 h-8 text-yellow-500" />
  </button>
);

const CityList = ({ showAll, onCityClick }) => {
  const cities = [
    { name: "Beijing", description: "Cloudy", icon: IoIosCloud },
    { name: "California", description: "Windy", icon: IoIosPartlySunny },
    { name: "Arab Emirates", description: "Mostly Sunny", icon: IoIosSunny },
    { name: "Charlottetown", description: "Sunny", icon: IoIosSunny },
    { name: "Brooklyn", description: "Cloudy", icon: IoIosCloud },
    { name: "Boise", description: "Windy", icon: IoIosPartlySunny },
    { name: "Philadelphia", description: "Mostly Sunny", icon: IoIosSunny },
    { name: "Washington D.C.", description: "Light Rain", icon: IoIosRainy }
  ];

  const visibleCities = showAll ? cities : cities.slice(0, 4);

  return (
    <>
      {showAll ? (
          <div className="grid grid-cols-2 space-y-3">
            {visibleCities.map((city, index) => (
              <CityWeatherButton
                key={index}
                city={city.name}
                weatherDescription={city.description}
                icon={city.icon}
                onCityClick={onCityClick}
              />
            ))}
          </div>) : 
          <div className="grid gap-7">
            {visibleCities.map((city, index) => (
              <CityWeatherButton
                key={index}
                city={city.name}
                weatherDescription={city.description}
                icon={city.icon}
                onCityClick={onCityClick}
              />
            ))}
          </div>  
          }
      
    </>
    
  );
};

export default CityList;