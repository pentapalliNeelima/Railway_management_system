import React, { useState } from 'react';
import axios from 'axios';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '500px',
  width: '100%',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
};

const inputStyle = {
  marginBottom: '10px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007BFF',
  border: 'none',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

function TrainSearch() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [trains, setTrains] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized: No token found');
        return;
      }
      const response = await axios.get('http://localhost:8000/api/seat-availabilities/check_availability/', {
        params: { source, destination, date },
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrains(response.data);
    } catch (error) {
      console.error('Error fetching seat availability:', error.response?.data || error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Source"
          style={inputStyle}
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          style={inputStyle}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Search</button>
      </form>
      <ul>
        {trains.map(train => (
          <li key={train.train}>
            {train.train_name} - Available seats: {train.available_seats}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainSearch;
