import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { setCity, fetchWeather } from '../../Redux/weatherSlice';

export const useWeather = () => {
  const dispatch = useDispatch<AppDispatch>();  //send the actions to the reducer
  
  // Redux state for weather
  const city = useSelector((state: RootState) => state.weather.city);
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const error = useSelector((state: RootState) => state.weather.error);
 

  // Handle city input change   | callback functions 
  const handleCityChange = (newCity: string) => {
    dispatch(setCity(newCity));
  };

  // Handle search button click
  const handleSearch = () => {
    if (!city.trim()) return;
    dispatch(fetchWeather(city));
  };

  // Initialize with default city
  useEffect(() => {
    dispatch(setCity('Bangalore'));
    dispatch(fetchWeather('Bangalore'));
  }, [dispatch]);

  return {
    city,
    weatherData,
    error,
    handleCityChange,
    handleSearch
  };
};
