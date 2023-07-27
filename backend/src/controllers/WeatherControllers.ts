// src/controllers/weatherController.ts
import { Request, Response } from 'express';
import WeatherData from '../models/WeatherData';



export const getWeatherData = async (_: Request, res: Response) => {
  try {
    const weatherData = await WeatherData.find().sort({ timestamp: 1 }).limit(10000000);
    res.json(weatherData);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const addRandomWeatherData = async () => {
  try {
    // Generate random weather data
    const randomTemperature = Math.floor(Math.random() * 20) + 10; // Random temperature between 10 and 30 degrees Celsius
    const randomHumidity = Math.floor(Math.random() * 60) + 40; // Random humidity between 40% and 100%
    const timestamp = new Date();

    // Create a new weather data entry
    const newWeatherData = new WeatherData({
      temperature: randomTemperature,
      humidity: randomHumidity,
      timestamp: timestamp,
    });

    // Save the new weather data entry to the database
    await newWeatherData.save();

    console.log('Random weather data added successfully!');
  } catch (err) {
    console.error('Error adding random weather data:', err);
  }
};
