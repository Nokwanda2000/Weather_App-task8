import React from 'react'

export default function Todayweather() {
  return (
    <>
    <div>
        <div className="app">
      <div className="header">
        <div className="location">
          <img src="location-icon.png" alt="Location Icon" />
          Location
        </div>
        <div className="date">
          Monday, 1 January 10:00
        </div>
      </div>
      <div className="weather-info">
        <div className="temperature">
          22°
        </div>
        <div className="weather-icon">
          <img src="sun-cloud.png" alt="Mostly Clear Icon" />
        </div>
        <div className="weather-description">
          Mostly Clear
        </div>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <img src="rain-icon.png" alt="Precipitation Icon" />
          30%
          Precipitation
        </div>
        <div className="detail-item">
          <img src="humidity-icon.png" alt="Humidity Icon" />
          20%
          Humidity
        </div>
        <div className="detail-item">
          <img src="wind-icon.png" alt="Wind Speed Icon" />
          12 km/h
          Wind Speed
        </div>
      </div>
      <div className="forecast">
        <div className="forecast-header">
          Today
        </div>
        <div className="forecast-items">
          <div className="forecast-item">
            <div className="forecast-time">
              9:00
            </div>
            <div className="forecast-icon">
              <img src="sun-icon.png" alt="Sunny Icon" />
            </div>
            <div className="forecast-temperature">
              22°
            </div>
          </div>
          <div className="forecast-item">
            <div className="forecast-time">
              10:00
            </div>
            <div className="forecast-icon">
              <img src="cloud-icon.png" alt="Cloudy Icon" />
            </div>
            <div className="forecast-temperature">
              22°
            </div>
          </div>
          <div className="forecast-item">
            <div className="forecast-time">
              11:00
            </div>
            <div className="forecast-icon">
              <img src="cloud-sun-icon.png" alt="Partly Cloudy Icon" />
            </div>
            <div className="forecast-temperature">
              21°
            </div>
          </div>
          <div className="forecast-item">
            <div className="forecast-time">
              12:00
            </div>
            <div className="forecast-icon">
              <img src="rain-cloud-icon.png" alt="Rainy Icon" />
            </div>
            <div className="forecast-temperature">
              16°
            </div>
          </div>
        </div>
      </div>
      <div className="forecast">
        <div className="forecast-header">
          7-Day Forecasts 
        </div>
      </div>
      <div className="other-cities">
        <div className="other-cities-header">
          Other Cities
        </div>
        <div className="other-city">
          <div className="other-city-location">
            <img src="location-icon.png" alt="Location Icon" />
            Location
          </div>
          <div className="other-city-weather">
            <div className="other-city-icon">
              <img src="cloud-icon.png" alt="Cloudy Icon" />
            </div>
            <div className="other-city-temperature">
              21°
            </div>
            <div className="other-city-description">
              Mostly Cloudy
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
