'use client'
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  results: string[];
}

const RadarChart: React.FC<RadarChartProps> = ({ results }) => {
  const labels = ['Acne', 'Rosacea', 'Wrinkles', 'Hyperpigmentation', 'Dryness', 'Large Pores'];
  const data: number[] = [];
  console.log(results);

  results.forEach((result: string) => {
    if (labels.includes(result)) {
      data.push(Math.random() * 10 + 40);
    } else {
      data.push(0)
    }
  });

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'white',
        borderWidth: 1,
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
      },
    ],
  });

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          color: 'white',
        },
        grid: {
          color: 'white',
        },
        pointLabels: {
          color: 'white',
        },
        ticks: {
          display: false,
          stepSize: 20,
          max: 50,
          count: 3, // This will give you ticks at 0, 20, 40
        },
        min: 0,
        max: 50,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
