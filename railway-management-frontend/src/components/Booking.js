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
  maxWidth: '400px',
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

function Booking() {
  const [trainId, setTrainId] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/bookings/book_seat/', 
        { train_id: trainId, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      
    } catch (error) {
      console.error('Booking failed:', error);
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
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Book Seat</button>
      </form>
    </div>
  );
}

export default Booking;
