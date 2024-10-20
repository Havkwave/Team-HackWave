// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import RealTimeEnergyMonitor from './RealTimeEnergyMonitor';
import DeviceDetails from './DeviceDetails';
import TipsPage from './TipsPage';
import AnalyticsEngine from './AnalyticsEngine';
import PieChart from './PieChart';
import UserPreferences from './UserPreferences'; 
import EnergyReport from './EnergyReport'; 
import EnergyOptimizationComponent from './EnergyOptimizationComponent'; // Ensure this import is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/realtime-energy-monitor" element={<RealTimeEnergyMonitor />} />
        <Route path="/device-details" element={<DeviceDetails />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/analytics" element={<AnalyticsEngine />} />
        <Route path="/pie-chart" element={<PieChart />} />
        <Route path="/user-preferences" element={<UserPreferences />} />
        <Route path="/energy-report" element={<EnergyReport />} />
        <Route path="/energy-optimization" element={<EnergyOptimizationComponent />} /> {/* Added route for EnergyOptimizationComponent */}
      </Routes>
    </Router>
  );
}

export default App;
