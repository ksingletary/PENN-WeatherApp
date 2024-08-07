import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from '../components/Navbar';
import useWeather from '../hooks/useWeather';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherView1 = ({ initialCity }) => {
  const { weather, forecast, error, fetchWeather } = useWeather();
  console.log(forecast);

  useEffect(() => {
    if (initialCity) {
      fetchWeather(initialCity);
    }
  }, [initialCity, fetchWeather]);

  if (!weather || !forecast) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: forecast.slice(0, 5).map(day => day.day), // Only show first 5 days
    datasets: [
      {
        label: 'Temperature',
        data: forecast.slice(0, 5).map(day => day.temp), // Only show first 5 days
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
        max: 35, // Maximum value for y-axis
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
      <Navbar
        initialCity={initialCity}
        locationName={weather?.location.name + `,${weather?.location.country}` || 'Location'}
        onFetchWeather={fetchWeather}
      />
      <div className="bg-[url('/dramaticsky.jpg')] bg-cover bg-center flex-grow text-white p-8 pt-24">
        <div className="bg-blackDark bg-opacity-50 border border-lightGray rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-bold mb-4">{weather.location.name}</h2>
              <div className="flex items-center">
                <span className="text-9xl text-orange-400 font-bold">{weather.current.temp_c}°</span>
                <span className="ml-4 text-3xl">{weather.current.condition.text}</span>
              </div>
            </div>
            <div className="text-right text-xl">
              <div>Sun {weather.current.temp_f}° {weather.current.feelslike_f}°</div>
              {/* <div className="mt-2">Air quality: {weather.current.air_quality['us-epa-index']} - Good</div> */}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-8">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Weather details</h3>
            <div className="grid grid-cols-3 gap-4 border border-lightGray rounded-2xl bg-lighterGray bg-opacity-30 p-6">
              {[
                { label: 'Feels like', value: `${weather.current.feelslike_c}°` },
                { label: 'ENE wind', value: `${weather.current.wind_kph} mi/h` },
                { label: 'Humidity', value: `${weather.current.humidity}%` },
                { label: 'UV', value: `${weather.current.uv}` },
                { label: 'Visibility', value: `${weather.current.vis_km} mi` },
                { label: 'Pressure', value: `${weather.current.pressure_mb} hPa` },
              ].map((item, index) => (
                <div key={index} className="bg-black bg-opacity-60 w-[130px] h-[120px] p-4 rounded-xl">
                  <div className="text-lg text-gray-400">{item.label}</div>
                  <div className="text-xl font-semibold mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">5-day weather forecast</h3>
            <div className="bg-lighterGray bg-opacity-85 border border-lightGray p-4 rounded-xl" style={{ height: '250px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherView1;