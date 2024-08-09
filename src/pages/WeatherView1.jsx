import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useWeather from '../hooks/useWeather';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import DashboardIcon from '../components/DashboardIcon';
import ChangeTempScale from '../components/ChangeTempScale';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const getEpaDescription = (index) => {
  switch(index) {
    case 1: return "Good";
    case 2: return "Moderate";
    case 3: return "Unhealthy for sensitive group";
    case 4: return "Unhealthy";
    case 5: return "Very Unhealthy";
    case 6: return "Hazardous";
    default: return "Unknown";
  }
};

const WeatherView1 = ({ initialCity }) => {
  const { weather, forecast, error, fetchWeather } = useWeather();
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState("temp_f");

    const handleScaleChange = (newScale) => {
        setScale(newScale);
    }

  useEffect(() => {
    if (initialCity) {
      setLoading(true);
      fetchWeather(initialCity).finally(() => setLoading(false));
    }
  }, [initialCity, fetchWeather]);

  if (loading) {
    return <Loading />;
  }

  if (error || !weather || !forecast) {
    return <ErrorMessage message={error} />;
  }

  const chartData = {
    labels: forecast.slice(0, 5).map(day => day.day), // first 5 days
    datasets: [
      {
        label: 'Temperature',
        data: forecast.slice(0, 5).map(day => scale === "temp_f" ? day.temp_f : day.temp_c), 
        borderColor: 'rgb(255, 204, 102)',
        backgroundColor: 'rgba(255, 204, 102, 0.5)',
        pointBorderColor: 'rgb(255, 204, 102)',
        pointBackgroundColor: 'rgb(255, 204, 102)',
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
          font: {
            size: 12,
          }
        }
      },
      y: {
        min: 15, // Minimum value for y-axis
        max: 100, // Maximum value for y-axis
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        ticks: {
          color: 'white',
          font: {
            size: 12,
          },
          stepSize: 5, // Increment by 5 degrees
          callback: function(value) {
            return value + '°';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative bg-[url('/dramaticsky.png')] bg-cover bg-center flex-grow text-white p-4 pt-12 md:pt-16">
        <div className='flex justify-between'> 
          <DashboardIcon top="-40px" left="0px" />
          <ChangeTempScale onScaleChange={handleScaleChange} />
        </div>
        <div className="bg-blackDark bg-opacity-50 border border-lightGray rounded-2xl p-4 mb-4 md:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className='w-[1090px] h-[264px]'>
              <h2 className="text-4xl md:text-5xl font-bold mb-2 mt-10 ml-10">{weather.location.name}</h2>
              <div className="flex items-center">
                <span className="text-7xl md:text-[5rem] mt-10 ml-10 text-orange-400 font-bold">{scale === "temp_f" ? weather.current.temp_f : weather.current.temp_c }°</span>
                <span className="ml-4 md:ml-8 text-3xl md:text-5xl">{weather.current.condition.text}</span>
              </div>
            </div>
            <div className="text-right mt-4 md:mt-20 text-xl space-y-8 pr-10">
              <div>{forecast[1].day}  {scale === "temp_f" ? weather.current.temp_f : forecast[3].temp_c }° {scale === "temp_f" ? weather.current.feelslike_f : weather.current.feelslike_c }°</div>
              <div className="mt-2">Air quality: {weather.current.co}co - {getEpaDescription(weather.current.us_epa_index)}</div>
            </div>
          </div>
        </div>
        <Link to='/weatherview2'>
          <FaArrowRight className='absolute hover:text-blue-950 w-12 md:w-16 h-12 md:h-16 right-4 md:right-8 -mt-4'/>
        </Link>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">Weather details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border border-lightGray rounded-2xl bg-lighterGray bg-opacity-30 p-4">
              {[
                { label: 'Feels like', value: `${scale === "temp_f" ? weather.current.feelslike_f : weather.current.feelslike_c }°` },
                { label: 'ENE wind', value: `${weather.current.wind} km/h` },
                { label: 'Humidity', value: `${weather.current.humidity}%` },
                { label: 'UV', value: `${weather.current.uv}` },
                { label: 'Visibility', value: `${forecast[1].visibility} mi` },
                { label: 'Pressure', value: `${weather.current.pressure} hPa` },
              ].map((item, index) => (
                <div key={index} className="bg-black bg-opacity-60 space-y-4 w-full h-[100px] p-2 rounded-xl">
                  <div className="text-lg text-gray-400">{item.label}</div>
                  <div className="text-xl text-center font-semibold mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">5-day weather forecast</h3>
            <div className="bg-lighterGray bg-opacity-85 border border-lightGray p-4 rounded-xl" style={{ height: '280px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherView1;