import { RiUserLocationLine } from "react-icons/ri";

const GeolocationButton = ({ onFetchWeather }) => {
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onFetchWeather(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
        <button onClick={handleGeolocation} className="z-10 text-white p-2 rounded">
            <RiUserLocationLine className='text-white w-8 h-8 ml-10'/>
        </button>
    </>
    
  );
};

export default GeolocationButton;