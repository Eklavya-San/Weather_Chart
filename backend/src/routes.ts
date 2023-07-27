// src/routes.ts
import { Router } from 'express';
import { getWeatherData,addRandomWeatherData } from './controllers/WeatherControllers';

const router = Router();

router.get('/weather', getWeatherData);
router.post('/weather/addRandom', addRandomWeatherData); 

export default router;
