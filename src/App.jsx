import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Inventory from './pages/Inventory';

function App() {

  return (
    <Router>
      <Topbar/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard"/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Inventory" element={<Inventory/>}/>
      </Routes>
    </Router>
  );
}

export default App;
