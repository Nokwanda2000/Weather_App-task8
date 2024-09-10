import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Todayweather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('South Africa'); // Default location

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'e5bf356dceae3d50a69a7a0abd15b064'; // Replace with your API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [location]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  };

  if (!weatherData) {
    return <div>Loading...</div>; // Display loading until data is fetched
  }

  return (
    <>
      <div style={{backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px'}}>
        <div className="app" style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'}}>
          <div className="header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <div className="location" style={{display: 'flex', alignItems: 'center'}}>
              <img src="location-icon.png" alt="Location Icon" style={{marginRight: '10px'}} />
              {weatherData.name}
            </div>
            <div className="date" style={{fontSize: '14px', color: '#666'}}>
              {formatDate(weatherData.dt)}
            </div>
          </div>
          <div className="weather-info" style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
            <div className="temperature" style={{fontSize: '48px', fontWeight: 'bold', marginRight: '20px'}}>
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="weather-icon" style={{marginRight: '20px'}}>
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
            </div>
            <div className="weather-description" style={{fontSize: '16px'}}>
              {weatherData.weather[0].description}
            </div>
          </div>
          <div className="weather-details" style={{display: 'flex', justifyContent: 'space-around', marginBottom: '20px'}}>
            <div className="detail-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src="rain-icon.png" alt="Precipitation Icon" style={{marginBottom: '5px'}} />
              {weatherData.main.humidity}%
              <span style={{fontSize: '12px', color: '#666'}}>Humidity</span>
            </div>
            <div className="detail-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src="humidity-icon.png" alt="Humidity Icon" style={{marginBottom: '5px'}} />
              {weatherData.wind.speed} km/h
              <span style={{fontSize: '12px', color: '#666'}}>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
