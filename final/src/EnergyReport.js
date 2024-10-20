import React, { useEffect, useRef } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, registerables } from 'chart.js';
import './EnergyReport.css';

Chart.register(ArcElement, CategoryScale, LinearScale, ...registerables);

const EnergyReport = ({ energyData }) => {
  // Provide default data in case energyData is undefined or incomplete
  const defaultData = {
    pieData: {
      labels: ['Source 1', 'Source 2', 'Source 3'],
      datasets: [
        {
          label: 'Energy by Source',
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
    barData: {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        {
          label: 'Monthly Consumption',
          data: [65, 59, 80, 81],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    lineData: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Weekly Usage',
          data: [150, 230, 180, 220],
          fill: false,
          borderColor: '#742774',
        },
      ],
    },
  };

  // Use the defaultData if energyData is missing or incomplete
  const pieData = energyData?.pieData || defaultData.pieData;
  const barData = energyData?.barData || defaultData.barData;
  const lineData = energyData?.lineData || defaultData.lineData;

  const pieRef = useRef(null);
  const barRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const pieChartInstance = pieRef.current;
    const barChartInstance = barRef.current;
    const lineChartInstance = lineRef.current;

    // Clean up and destroy any existing chart instances
    return () => {
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }
      if (barChartInstance) {
        barChartInstance.destroy();
      }
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }
    };
  }, [energyData]);

  return (
    <div className="energy-report">
      <h1 className="report-title">Energy Consumption Report</h1>
      <div className="chart-container">
        <div className="chart">
          <h2>Energy Consumption by Source (Pie Chart)</h2>
          <Pie ref={pieRef} data={pieData} />
        </div>
        <div className="chart">
          <h2>Monthly Energy Consumption (Bar Chart)</h2>
          <Bar ref={barRef} data={barData} />
        </div>
        <div className="chart">
          <h2>Energy Usage Over Time (Line Graph)</h2>
          <Line ref={lineRef} data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default EnergyReport;
