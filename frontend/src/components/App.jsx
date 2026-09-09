import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
