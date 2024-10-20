import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // For data visualization
import 'chart.js/auto'; // No need to import ChartJS since 'chart.js/auto' does this automatically
import './EnergyOptimizationComponent.css'; // Import the CSS for styling

const EnergyOptimizationComponent = () => {
  // Simulated energy data
  const [energyData] = useState([
    { date: '2024-10-01', energy_consumed: 120, cost_saved: 20, carbon_emissions: 50 },
    { date: '2024-10-02', energy_consumed: 130, cost_saved: 25, carbon_emissions: 60 },
    { date: '2024-10-03', energy_consumed: 110, cost_saved: 18, carbon_emissions: 45 }
  ]);

  const [logs, setLogs] = useState([]); // Audit logging data

  // Logging function for compliance
  const logAction = (action) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action
    };
    const updatedLogs = [...logs, logEntry];
    setLogs(updatedLogs);
    localStorage.setItem('audit_logs', JSON.stringify(updatedLogs)); // Store logs in localStorage
  };

  // Example: Simulate API integration with third-party system (fetch call)
  useEffect(() => {
    fetch('/api/energy-management-system')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched third-party data:', data);
        // Simulate merging with existing data
        logAction('Imported data from third-party system');
      })
      .catch(err => console.error('Error fetching third-party data:', err));
  }, [logAction]); // Add logAction to the dependency array

  // Export logs for compliance (CSV format)
  const exportLogs = () => {
    const headers = ['Timestamp', 'Action'];
    const rows = logs.map(log => [log.timestamp, log.action]);
    
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(rowArray => {
      let row = rowArray.join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'audit-logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chart.js data for visualizing energy data
  const chartData = {
    labels: energyData.map(item => item.date),
    datasets: [
      {
        label: 'Energy Consumed (kWh)',
        data: energyData.map(item => item.energy_consumed),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      },
      {
        label: 'Cost Saved ($)',
        data: energyData.map(item => item.cost_saved),
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false
      },
      {
        label: 'Carbon Emissions (kg)',
        data: energyData.map(item => item.carbon_emissions),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
      }
    ]
  };

  return (
    <div>
      <h1>Energy Consumption Optimization</h1>

      {/* Visualization: Line Chart */}
      <div className="chart-container">
        <Line data={chartData} />
      </div>

      {/* Export Reports */}
      <h2>Export Reports</h2>
      <button onClick={() => window.print()}>Export to PDF</button>
      <button onClick={() => exportLogs()}>Export Audit Logs (CSV)</button>

      {/* Simulated Audit Log Entries */}
      <h3>Audit Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnergyOptimizationComponent;
