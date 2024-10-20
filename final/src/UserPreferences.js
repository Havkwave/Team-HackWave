import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPreferences.css';

const UserPreferences = () => {
  const [chartType, setChartType] = useState('bar');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5); // Default rating
  const API_URL = 'http://localhost:3000/preferences'; // Endpoint for preferences
  const FEEDBACK_URL = 'http://localhost:3000/feedback'; // Endpoint for feedback

  // Load saved preferences from API
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(API_URL);
        const savedPreferences = response.data;
        if (savedPreferences) {
          setChartType(savedPreferences.chartType);
          setDateRange(savedPreferences.dateRange);
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  // Save preferences to API
  useEffect(() => {
    const savePreferences = async () => {
      try {
        await axios.put(API_URL, { chartType, dateRange });
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    };

    savePreferences();
  }, [chartType, dateRange]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send feedback to the server
    try {
      await axios.post(FEEDBACK_URL, { feedback, rating });
      console.log('Feedback submitted:', feedback, 'Rating:', rating);
      setFeedback(''); // Clear feedback input
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="preferences-container">
      <h2>User Preferences</h2>
      
      <div className="preference-item">
        <label>Chart Type:</label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </div>

      <div className="preference-item">
        <label>Start Date:</label>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
      </div>

      <div className="preference-item">
        <label>End Date:</label>
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </div>

      <div className="feedback-section">
        <h3>Feedback on Recommendations</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Provide your feedback here..."
            required
          />
          <div className="rating">
            <label>Rating:</label>
            <select value={rating} onChange={handleRatingChange}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default UserPreferences;
