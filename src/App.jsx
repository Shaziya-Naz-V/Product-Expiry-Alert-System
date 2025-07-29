import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Login from './components/Login'; // ⬅️ Import login page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {/* If logged in, show Topbar and Navbar */}
      {isAuthenticated && <Topbar setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Default route: if not logged in → Login page */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/inventory"
          element={isAuthenticated ? <Inventory /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
