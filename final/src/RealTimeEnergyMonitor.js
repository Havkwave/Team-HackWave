// src/components/RealTimeEnergyMonitor.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import './RealTimeEnergyMonitor.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RealTimeEnergyMonitor = () => {
  const navigate = useNavigate();
  const [energyData, setEnergyData] = useState([]);
  const [deviceEnergy, setDeviceEnergy] = useState({
    'Device 1': 0,
    'Device 2': 0,
    'Device 3': 0,
  });

  // Simulate real-time data updates
  const fetchRealTimeData = () => {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const timestamp = new Date().toLocaleTimeString();

    setEnergyData((prev) => [...prev.slice(-9), { time: timestamp, value: randomValue }]);
    setDeviceEnergy((prev) => ({
      'Device 1': prev['Device 1'] + Math.floor(Math.random() * 10) + 1,
      'Device 2': prev['Device 2'] + Math.floor(Math.random() * 20) + 1,
      'Device 3': prev['Device 3'] + Math.floor(Math.random() * 30) + 1,
    }));
  };

  useEffect(() => {
    const interval = setInterval(fetchRealTimeData, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: energyData.map((entry) => entry.time),
    datasets: [
      {
        label: 'Real-Time Energy Consumption (kWh)',
        data: energyData.map((entry) => entry.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const goToTipsPage = () => {
    navigate('/tips');
  };

  const goToAnalyticsPage = () => {
    navigate('/analytics');
  };

  const goToUserPreferencesPage = () => {
    navigate('/user-preferences');
  };

  const goToEnergyReportPage = () => {
    navigate('/energy-report');
  };

  const goToEnergyOptimizationPage = () => {
    navigate('/energy-optimization');
  };

  return (
    <div className="dashboard">
      <div className="header-buttons">
        <button className="analytics-button" onClick={goToAnalyticsPage}>
          Analytics
        </button>
        <button className="feedback-button" onClick={goToUserPreferencesPage}>
          Feedback
        </button>
        <button className="energy-report-button" onClick={goToEnergyReportPage}>
          Energy Report
        </button>
        <button className="energy-optimization-button" onClick={goToEnergyOptimizationPage}>
          Energy Optimization
        </button>
      </div>

      <div className="chart-container">
        <h1>Real-Time Energy Monitoring</h1>
        <Line data={chartData} />
        <button onClick={goToTipsPage} className="tips-button">
          View Energy Saving Tips
        </button>
      </div>

      <div className="device-energy">
        <h2>Device Energy Usage:</h2>
        <ul>
          {Object.entries(deviceEnergy).map(([device, energy]) => (
            <li key={device}>
              {device}: {energy} kWh
            </li>
          ))}
        </ul>
      </div>

      <div className="device-buttons">
        {['Device 1', 'Device 2', 'Device 3'].map((device) => (
          <button
            key={device}
            className="device-button"
            onClick={() => navigate(`/device/${device}`)}
          >
            {device}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RealTimeEnergyMonitor;
