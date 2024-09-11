import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Location from '../assets/placeholder.png';
import Humid from '../assets/humidity.png';
import Wind from '../assets/storm.png';

export default function Todayweather() {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [location, setLocation] = useState('Pietermaritzburg'); // Default location
  const [searchLocation, setSearchLocation] = useState(''); // Search input value
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light'); // Default theme
  const [units, setUnits] = useState('metric'); // Default to Celsius ('metric')

  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light'); // Save preference
  };

  // Toggle between Celsius ('metric') and Fahrenheit ('imperial')
  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
    localStorage.setItem('units', units === 'metric' ? 'imperial' : 'metric'); // Save preference
  };

  // Fetch weather data based on location
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedUnits = localStorage.getItem('units');
    if (savedTheme) setTheme(savedTheme);
    if (savedUnits) setUnits(savedUnits);

    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch 5-day/3-hour forecast with selected units
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=e5bf356dceae3d50a69a7a0abd15b064&units=${units}`
        );
        
        const forecastList = response.data.list;

        // Extract hourly forecast (next 12 hours)
        const hourly = forecastList.slice(0, 12);
        setHourlyForecast(hourly);

        // Group the forecast by day for daily forecast (next 5 days)
        const daily = [];
        forecastList.forEach(item => {
          const date = new Date(item.dt_txt).toLocaleDateString();
          if (!daily.some(forecast => forecast.date === date)) {
            daily.push({
              date: date,
              temp: item.main.temp,
              weather: item.weather[0]
            });
          }
        });
        setDailyForecast(daily.slice(0, 5)); // Show only next 5 days

        // Set current weather data
        setWeatherData(response.data.city);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch weather data');
        setLoading(false);
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [location, units]); // Re-fetch when location or units change

  // Format date helper function
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      setLocation(searchLocation); // Update the location with the user input
      setSearchLocation(''); // Clear the search input
    }
  };

  if (loading) {
    return <div className="spinner"></div>; // Display loading spinner until data is fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className='MAINDIV' style={{ backgroundColor: theme === 'light' ? '#f0f0f0' : '#333', padding: '20px', borderRadius: '10px', height: '100%', color: theme === 'light' ? '#000' : '#fff' }}>
      <div className="app" style={{ backgroundColor: theme === 'light' ? '#fff' : '#444', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Theme and Unit Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button onClick={toggleTheme} style={toggleButtonStyle}>Toggle Theme</button>
          <button onClick={toggleUnits} style={toggleButtonStyle}>
            {units === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={searchLocation}
            onChange={handleSearchChange}
            placeholder="Search for a location..."
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
          />
        </form>

        {/* Current Weather */}
        <div className="header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <div className="location" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img src={Location} alt="Location Icon" style={{ marginRight: '10px', width: "50px" }} />
            {weatherData.name}
          </div>
          <div className="date" style={{ fontSize: '14px', color: theme === 'light' ? '#666' : '#ccc' }}>
            {formatDate(new Date())}
          </div>
        </div>

        {/* Weather Info */}
        <div className="weather-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <div className="temperature" style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
            {Math.round(hourlyForecast[0].main.temp)}°{units === 'metric' ? 'C' : 'F'}
          </div>
          <div className="weather-icon" style={{ marginBottom: '10px' }}>
            <img src={`http://openweathermap.org/img/wn/${hourlyForecast[0].weather[0].icon}.png`} alt={hourlyForecast[0].weather[0].description} />
          </div>
          <div className="weather-description" style={{ fontSize: '16px' }}>
            {hourlyForecast[0].weather[0].description}
          </div>
        </div>

        {/* Weather Details */}
        <div className="weather-details" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <div className="detail-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={Humid} alt="Humidity Icon" style={{ marginBottom: '5px', width: '50px' }} />
            {hourlyForecast[0].main.humidity}%
            <span style={{ fontSize: '12px', color: theme === 'light' ? '#666' : '#ccc' }}>Humidity</span>
          </div>
          <div className="detail-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={Wind} alt="Wind Speed Icon" style={{ marginBottom: '5px', width: "50px" }} />
            {hourlyForecast[0].wind.speed} {units === 'metric' ? 'km/h' : 'mph'}
            <span style={{ fontSize: '12px', color: theme === 'light' ? '#666' : '#ccc' }}>Wind Speed</span>
          </div>
        </div>

        {/* Hourly Forecast */}
        <h2 style={{ textAlign: 'center' }}>Hourly Forecast</h2>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0 10px' }}>
          {hourlyForecast.map((hour, index) => (
            <div key={index} style={{ padding: '10px', textAlign: 'center' }}>
              <div>{new Date(hour.dt_txt).toLocaleTimeString()}</div>
              <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt={hour.weather[0].description} />
              <div>{Math.round(hour.main.temp)}°{units === 'metric' ? 'C' : 'F'}</div>
            </div>
          ))}
        </div>

        {/* Daily Forecast */}
        <h2 style={{ textAlign: 'center' }}>5-Day Forecast</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {dailyForecast.map((day, index) => (
            <div key={index} style={{ padding: '10px', textAlign: 'center', flex: '1 1 20%', maxWidth: '20%' }}>
              <div>{day.date}</div>
              <img src={`http://openweathermap.org/img/wn/${day.weather.icon}.png`} alt={day.weather.description} />
              <div>{Math.round(day.temp)}°{units === 'metric' ? 'C' : 'F'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Toggle button styling
const toggleButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0 10px'
};
