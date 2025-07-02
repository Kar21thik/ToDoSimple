// pages/Weather.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = "1ccd2434e55b8bd83085c433ca66219d";

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const fetchWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError('Please enter a city name');
      setWeatherData(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: trimmedCity,
            appid: API_KEY,
            units: 'metric',
          }
        }
      );

      if (response.status === 200) {
        setWeatherData(response.data);
        setError('');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setWeatherData(null);
    }
  };


  useEffect ( ()=> {
    const defaultCity = "";
    setCity(defaultCity);
    console.log(defaultCity);
    fetchWeather();

  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-4">
      <h1 className="text-3xl font-bold mb-6">Weather Checker</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="e.g., Delhi or London,UK"
        className="p-2 rounded border border-gray-400 w-64 mb-4 text-center"
      />

      <button
        onClick={fetchWeather}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Get Weather
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {weatherData && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-80 text-center space-y-2">
          <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <p>☁️ Condition: {weatherData.weather[0].description}</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
