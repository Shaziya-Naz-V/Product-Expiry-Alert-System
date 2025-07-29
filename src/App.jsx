// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import Topbar from './components/Topbar';
// import Navbar from './components/Navbar';
// import Inventory from './pages/Inventory';

// function App() {

//   return (
//     <Router>
//       <Topbar/>
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={<Navigate to="/dashboard"/>}/>
//         <Route path="/Dashboard" element={<Dashboard/>}/>
//         <Route path="/Inventory" element={<Inventory/>}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Login from './components/Login'; // ⬅️ import your login page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {/* If logged in, show Topbar and Navbar */}
      {isAuthenticated && <Topbar />}
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
