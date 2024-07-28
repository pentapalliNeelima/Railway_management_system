import React from 'react';
import { Link } from 'react-router-dom';

const containerStyle = {
  margin:'170px',
  textAlign: 'center',
  padding: '20px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'darkblue',
  color: 'white',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: 'green',
  border: 'none',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

function Navigation() {
  return (
    <div >
       <header style={headerStyle}>
        <h1>Dashboard</h1>
        <Link to="/add-train">
          <button style={buttonStyle}>Add Train</button>
        </Link>
      </header>
      <div style={containerStyle}>
      <Link to="/search">
        <button style={buttonStyle}>Search Train</button>
      </Link>
      <Link to="/booking">
        <button style={buttonStyle}>Booking</button>
      </Link>
      </div>
    </div>
  );
}

export default Navigation;
