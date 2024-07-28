import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
};

const detailsStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: 'white',
  maxWidth: '600px',
  width: '100%',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

function BookingDetails() {
  const { id } = useParams();  
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Unauthorized: No token found');
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/bookings/${id}/booking_details/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooking(response.data);
      } catch (err) {
        setError('Error fetching booking details');
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={detailsStyle}>
        <h2>Booking Details</h2>
        <p><strong>Booking ID:</strong> {booking.id}</p>
        <p><strong>Train ID:</strong> {booking.train_id}</p>
        <p><strong>Seat Number:</strong> {booking.seat_number}</p>
        <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
}

export default BookingDetails;
