import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';

interface CustomChartOptions extends ChartOptions {
  plugins?: {
    legend: {
      display: boolean;
      position: 'top' | 'bottom' | 'left' | 'right';
    };
    datalabels: {
      display: boolean;
      align: string;
      anchor: string;
    };
  };
}

interface WeatherChartProps {
  weatherData: any[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ weatherData }) => {
  const chartRef = useRef<any>(null); // Reference to the chart instance

  useEffect(() => {
    if (chartRef.current) {
      // If chartRef is already set, update the chart with new data
      chartRef.current.data.labels = weatherData.map((data) => data.timestamp);
      chartRef.current.data.datasets[0].data = weatherData.map((data) => data.temperature);
      chartRef.current.data.datasets[1].data = weatherData.map((data) => data.humidity);
      chartRef.current.update();
    } else {
      // If chartRef is not set, create the chart with initial data
      const chartData: ChartData = {
        labels: weatherData.map((data) => data.timestamp),
        datasets: [
          {
            label: 'Temperature (°C)',
            data: weatherData.map((data) => data.temperature),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.5
          },
          {
            label: 'Humidity (%)',
            data: weatherData.map((data) => data.humidity),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.5
          },
        ],
      };

      const chartOptions: CustomChartOptions = {
        scales: {
          x: {
            display: false, // Hide the x-axis
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          datalabels: {
            display: true,
            align: 'end',
            anchor: 'end',
          },
        },
      };

      // Create the chart
      chartRef.current = new Chart('myChart', {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });
    }
  }, [weatherData]); // Run the effect whenever weatherData changes

  return (
    <div>
      <canvas id="myChart" />
    </div>
  );
};

export default WeatherChart;
