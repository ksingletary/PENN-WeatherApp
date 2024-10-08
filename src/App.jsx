import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import WeatherView1 from './pages/WeatherView1';
import WeatherView2 from './pages/WeatherView2';

const App = () => {
  const [city, setCity] = useState(null);

  const handleCitySubmit = (submittedCity) => {
    setCity(submittedCity);
  };

  return (
    <Router>
      <div className=''>
        <Routes>
          <Route
            path="/"
            element={!city ? <IntroPage onCitySubmit={handleCitySubmit} /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={city ? <HomePage initialCity={city} /> : <Navigate to="/" />}
          />
          <Route
            path="/weatherview1"
            element={<WeatherView1 initialCity={city} />}
          />
          <Route
            path="/weatherview2"
            element={<WeatherView2 initialCity={city} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;