import React, { useState, useEffect } from 'react';
import { getWeatherForecast } from '../../api/api';

function WeatherForecast() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await getWeatherForecast();
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div>
      <h2>Weather Forecast</h2>
      <ul>
        {weather.map((forecast, index) => (
          <li key={index}>
            {forecast.date}: {forecast.temperatureC}°C - {forecast.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherForecast;
