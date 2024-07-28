
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navigation from './components/Navigation';
import AddTrain from './components/AddTrain';
import TrainSearch from './components/TrainSearch';
import Booking from './components/Booking';
import BookingDetails from './components/BookingDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Navigation />} />
        <Route path="/search" element={<TrainSearch />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
        <Route path="/add-train" element={<AddTrain />} />
        
        {/* Define routes for search and booking components */}
      </Routes>
    </Router>
  );
}

export default App;
