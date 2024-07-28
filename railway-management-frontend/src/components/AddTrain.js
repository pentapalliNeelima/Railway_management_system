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

function AddTrain() {
  const [trainId, setTrainId] = useState('');
  const [trainName, setTrainName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [totalSeats, setTotalSeats] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized: No token found');
        return;
      }
      try{
      await axios.post('http://localhost:8000/api/trains/', 
        { train_id: trainId, train_name: trainName, source, destination, total_seats: totalSeats },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
    } catch (error) {
      console.error('Error creating train:', error.response?.data||error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={trainId}
          onChange={(e) => setTrainId(e.target.value)}
          placeholder="Train ID"
          style={inputStyle}
        />
        <input
          type="text"
          value={trainName}
          onChange={(e) => setTrainName(e.target.value)}
          placeholder="Train Name"
          style={inputStyle}
        />
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
          type="number"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          placeholder="Total Seats"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add Train</button>
      </form>
    </div>
  );
}

export default AddTrain;
