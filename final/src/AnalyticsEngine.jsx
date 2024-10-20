// components/AnalyticsEngine.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalyticsEngine.css';

const initialData = [
  { activity: 'Car Travel', emissions: 100, category: 'Transport' },
  { activity: 'Flight', emissions: 200, category: 'Transport' },
  { activity: 'Electricity', emissions: 300, category: 'Energy' },
  { activity: 'Plastic Waste', emissions: 50, category: 'Waste' },
];

const AnalyticsEngine = () => {
  const [data, setData] = useState(initialData);
  const [newActivity, setNewActivity] = useState({ activity: '', emissions: '', category: '' });
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  
  const navigate = useNavigate();

  useEffect(() => {
    const total = data.reduce((sum, item) => sum + item.emissions, 0);
    setTotalEmissions(total);

    const grouped = data.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.emissions;
      return acc;
    }, {});
    setCategoryData(grouped);

    const recs = [];
    if (total > 400) recs.push('Reduce flights by 20%.');
    if (total > 300) recs.push('Use renewable energy sources.');
    if (total > 100) recs.push('Recycle waste regularly.');
    setRecommendations(recs);
  }, [data]);

  const handleChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const addActivity = () => {
    const { activity, emissions, category } = newActivity;
    if (!activity || !emissions || !category || isNaN(emissions)) {
      alert('Please enter valid data!');
      return;
    }
    setData([...data, { activity, emissions: Number(emissions), category }]);
    setNewActivity({ activity: '', emissions: '', category: '' });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  return (
    <div className="app-container">
      <h1>Enhanced Analytics Engine</h1>
      <h2>Total Carbon Footprint: {totalEmissions} kg CO2</h2>

      <div className="input-container">
        <input
          type="text"
          name="activity"
          placeholder="Activity Name"
          value={newActivity.activity}
          onChange={handleChange}
        />
        <input
          type="number"
          name="emissions"
          placeholder="Emissions (kg CO2)"
          value={newActivity.emissions}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newActivity.category}
          onChange={handleChange}
        />
        <button onClick={addActivity}>Add Activity</button>
      </div>

      <button onClick={toggleModal}>View Optimization Recommendations</button>

      <h3>Activity Breakdown:</h3>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Category</th>
            <th>Emissions (kg CO2)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.activity}</td>
              <td>{item.category}</td>
              <td>{item.emissions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate('/pie-chart', { state: categoryData })}>View Pie Chart</button>

      {/* Modal for Recommendations */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Optimization Recommendations:</h3>
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            ) : (
              <p>No recommendations available.</p>
            )}
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsEngine;
