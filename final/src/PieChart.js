// components/PieChart.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { state: categoryData } = useLocation(); // Get data from location state
  const navigate = useNavigate(); // Use navigate to redirect

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Category-wise Emissions (Pie Chart)</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pie data={pieChartData} />
      </div>
      
      <button onClick={() => navigate('/')}>Back to Analytics</button>
    </div>
  );
};

export default PieChart;
