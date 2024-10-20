// src/components/TipsPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TipsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { deviceEnergy } = location.state || { deviceEnergy: {} };

  // Calculate the highest energy-consuming device
  const highestDevice = Object.entries(deviceEnergy).reduce(
    (max, [device, consumption]) => (consumption > max[1] ? [device, consumption] : max),
    ['', 0]
  );

  // Calculate the average consumption for each device and overall average
  const totalConsumption = Object.values(deviceEnergy).reduce((sum, value) => sum + value, 0);
  const deviceCount = Object.keys(deviceEnergy).length;
  const averageConsumption = totalConsumption / deviceCount;

  const tips = [
    'Turn off devices when not in use.',
    'Use energy-efficient appliances.',
    'Monitor your energy usage regularly.',
    'Switch to LED lights.',
    'Use natural light whenever possible.',
  ];

  return (
    <div
      style={{
        backgroundImage: 'url("https://t3.ftcdn.net/jpg/02/71/06/36/360_F_271063601_bF8ukMjLRIjK72cHpO79NJNY1bgmUACv.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1>Energy Saving Tips</h1>

      <h2>Highest Energy Consumer: {highestDevice[0]} ({highestDevice[1]} kWh)</h2>
      <h2>Overall Average Consumption: {averageConsumption.toFixed(2)} kWh</h2>

      {/* Device-Wise Average Consumption Table */}
      <table
        style={{
          margin: '20px auto',
          borderCollapse: 'collapse',
          width: '50%',
          textAlign: 'left',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#333' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Device</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Energy Consumption (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(deviceEnergy).map(([device, consumption]) => (
            <tr key={device}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{device}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{consumption} kWh</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tips.map((tip, index) => (
          <li key={index} style={{ margin: '10px 0', fontSize: '18px' }}>
            {tip}
          </li>
        ))}
      </ul>

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

export default TipsPage;
