import React from 'react';
import { Line } from 'react-chartjs-2';

interface StatsChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Clicks',
        data: data.values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StatsChart;