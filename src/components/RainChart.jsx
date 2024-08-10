import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useWeather from '../hooks/useWeather';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RainChart = ({city}) => {
  
  const {forecast, fetchWeather } = useWeather();
  const [rainData, setRainData] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchWeather(city);
    };

    fetchInitialData();
  }, [fetchWeather]);

  useEffect(() => {
    if (forecast && forecast[1] && forecast[1].hourlyRainChance) {
      const hourlyData = forecast[1].hourlyRainChance.filter(hourData =>
        ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].includes(hourData.time.split(' ')[1])
      );

      setRainData(hourlyData.map(hourData => hourData.chance_of_rain));
    }
  }, [forecast]);

  const data = {
    labels: ['10AM', '11AM', '12PM', '1PM', '2PM', '3PM'],
    datasets: [
      {
        label: 'Chance of Rain',
        data: rainData || [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        type: 'category',
        labels: ['Heavy', 'Sunny', 'Rainy'],
        reverse: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: 'white',
      },
    },
  };

  return (
    <div className="flex-none w-full md:w-1/4 lg:w-auto bg-transparent p-4 rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default RainChart;