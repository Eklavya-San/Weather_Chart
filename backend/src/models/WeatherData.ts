
import mongoose, { Schema, Document } from 'mongoose';

export interface WeatherData extends Document {
  temperature: number;
  humidity: number;
  timestamp: Date;
}

const WeatherDataSchema: Schema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

export default mongoose.model<WeatherData>('WeatherData', WeatherDataSchema);
