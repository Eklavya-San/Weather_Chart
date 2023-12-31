import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherChart from './WeatherChart';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/weather');
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 60000);

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="App">
      <h1>Wathare Infotech Solutions</h1> 
      <div className="WeatherChartContainer">
        <WeatherChart weatherData={weatherData} />
      </div>
      <div className="App">
        <h3>Automatically new data will update in 1 min</h3>
        <p>Name: Eklavya Shivaji Ghodake</p>
        <p>CCPPID: PD0345</p>
      </div>
    </div>
  );
};

export default App;
