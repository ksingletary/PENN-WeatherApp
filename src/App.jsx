import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';

const App = () => {
  const [city, setCity] = useState(null);

  const handleCitySubmit = (submittedCity) => {
    setCity(submittedCity);
  };

  return (
    <div className='min-h-[100vh] bg-blackDarker'>
      {!city ? (
        <IntroPage onCitySubmit={handleCitySubmit} />
      ) : (
        <HomePage initialCity={city} />
      )}
    </div>
  );
};

export default App;