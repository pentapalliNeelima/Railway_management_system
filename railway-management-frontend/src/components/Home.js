import React from 'react';
import { Link } from 'react-router-dom';

const containerStyle = {
  textAlign: 'center',
  padding: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: '#28a745',
  border: 'none',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

function Home() {
  return (
    <div style={containerStyle}>
      <h1>Welcome to Railway Management System</h1>
      <Link to="/register">
        <button style={buttonStyle}>Register</button>
      </Link>
      <Link to="/login">
        <button style={buttonStyle}>Login</button>
      </Link>
    </div>
  );
}

export default Home;
