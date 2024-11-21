import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import LogForm from './components/LogForm';
import LogList from './components/LogList';
import LogDashboard from './components/LogDashboard'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Event Logging System</h1>
        
        
        <Navigation />
        
        <Routes>
          <Route path="/" element={<><LogForm /><LogList /></>} />
          <Route path="/dashboard" element={<LogDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}


function Navigation() {
  const location = useLocation(); 

  return (
    <div className="mb-4">
      {location.pathname === '/dashboard' ? (
        <Link to="/">
          <span className="text-blue-600 font-medium">Back To Home</span>
        </Link>
      ) : (
        <Link to="/dashboard">
          <span className="text-blue-600 font-medium">Go To Dashboard</span>
        </Link>
      )}
    </div>
  );
}

export default App;
