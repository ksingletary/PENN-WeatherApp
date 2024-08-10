import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";
import { FaMagnifyingGlass } from "react-icons/fa6";

const IntroPage = ({ onCitySubmit }) => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onCitySubmit(city);
    navigate('/home');
  };

  return (
    <main className="flex justify-center items-center xsm:h-[2575px] md:h-screen lg:h-screen bg-blackDark">
      <section className='flex '>
        <SlLocationPin className='w-20 h-20 text-white'/>
        <form onSubmit={handleSubmit} className="p-4 relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city/region"
            className="border p-2 rounded w-72 mt-4"
          />
          <button onClick={handleSubmit}>
            <FaMagnifyingGlass className="absolute right-4 top-1/2 transform mr-3  text-black" />
          </button>
        </form>
      </section>
    </main>
  );
};

export default IntroPage;