// src/server.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from "mongoose";
import routes from './routes';
import WeatherData from './models/WeatherData';
import { addRandomWeatherData } from './controllers/WeatherControllers';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI || '';

 mongoose
      .connect(mongoURI!)
      .then((res) => {
        console.log(
          'Connected to Distribution API Database - Initial Connection'
          
        );
         setInterval(addRandomWeatherData.bind(this), 1000000);
      })
      .catch((err) => {
        console.log(
          `Initial Distribution API Database connection error occured -`,
          err
        );
      });

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// Your API routes will go here...
app.post('/api/weather/insert', async (req, res) => {
    try {
      // Sample weather data (replace with actual data)
      const weatherData = [
        { timestamp: new Date('2023-07-28T12:00:00Z'), temperature: 25, humidity: 60 },
        { timestamp: new Date('2023-07-28T13:00:00Z'), temperature: 27, humidity: 58 },
        // Add more sample data as needed
      ];
  
      // Insert weather data into the database
      await WeatherData.insertMany(weatherData);
  
      res.json({ message: 'Weather data inserted successfully!' });
    } catch (error) {
      console.error('Error inserting weather data:', error);
      res.status(500).json({ message: 'Failed to insert weather data.' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
