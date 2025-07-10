import React from 'react';
import { useWeather } from './hooks/useWeather';
import { useCounter } from '../Context/CounterContext';

const Weather: React.FC = () => {
  // Custom hook for weather functionality
  const { 
    city, 
    weatherData, 
    error, 
    handleCityChange, 
    handleSearch 
  } = useWeather();

  // useContext for counter
  const { count, incrementCount } = useCounter();

  return (
    // Main container with scrolling enabled
    <div className="h-screen pt-16 pb-4 px-4 overflow-y-auto bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Content container */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Weather Checker</h1>

        <input
          type="text"
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          placeholder="e.g., Delhi or London,UK"
          className="p-2 rounded border border-gray-400 w-64 mb-4 text-center"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Weather
        </button>

   {/* {loading && <p className="mt-4">Loading weather data...</p>} */}
        
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {weatherData && (
          <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-80 text-center space-y-2">
            <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
            <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
            <p>☁️ Condition: {weatherData.weather[0].description}</p>
            <p>💧 Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}

        {/* Shared Counter Section using Context */}
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg w-80 text-center">
          <h3 className="text-xl font-semibold mb-4">Counter Section</h3>
          <button 
            onClick={incrementCount}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded mb-3"
          >
            Increment Counter
          </button>
          <p className="text-lg font-medium">Current Count: {count}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
