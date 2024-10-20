// src/components/DeviceDetails.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useParams, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DeviceDetails = () => {
  const { deviceName } = useParams(); // Get device name from URL
  const navigate = useNavigate();

  // Static data for each device
  const staticData = {
    'Device 1': [10, 20, 30, 25, 15, 35, 45, 40, 30, 20],
    'Device 2': [5, 15, 10, 20, 25, 30, 35, 25, 15, 10],
    'Device 3': [30, 40, 50, 45, 35, 55, 60, 50, 40, 30],
  };

  const chartData = {
    labels: staticData[deviceName].map((_, index) => `T${index + 1}`),
    datasets: [
      {
        label: `${deviceName} Example Consumption (kWh)`,
        data: staticData[deviceName],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{deviceName} Consumption Example</h1>
      <Line data={chartData} />
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default DeviceDetails;
