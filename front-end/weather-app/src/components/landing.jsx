import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Landing() {
    const navigate = useNavigate();

    // Function to handle button click for navigation
    const handleNavigate = () => {
        navigate('/Todayweatherpage'); 
    }

    return (
        <div className="container">
            <div className="weather-icon">
                <img  />
            </div>
            <h1>Weather Forecasts</h1>
            <p>Stay updated with everyday weather changes.</p>
            <button onClick={handleNavigate}>Get Start</button>
        </div>
    );
}
