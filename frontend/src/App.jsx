import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          {/* Navigation Bar Minimal */}
          <nav className="w-full py-5 px-6 md:px-12 bg-white/80 backdrop-blur-md border-b border-white/20 flex justify-between items-center shadow-sm z-50 sticky top-0">
            <div className="text-3xl font-heading font-black text-primary-900 tracking-tighter">Charity<span className="text-accent-500">Core</span></div>
            <div className="flex gap-6 items-center">
              <a href="/" className="text-slate-600 hover:text-primary-600 font-semibold transition-colors duration-200">Home</a>
              <AuthNavLinks />
            </div>
          </nav>

          <main className="flex-1 flex flex-col relative w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

const AuthNavLinks = () => {
  const { user, logout } = useAuth();
  if (user) {
    return (
      <>
        <a href="/dashboard" className="text-slate-600 hover:text-primary-600 font-semibold transition-colors duration-200">Dashboard</a>
        <button onClick={logout} className="text-primary-600 font-semibold ml-2 hover:bg-primary-50 px-4 py-2 rounded-full transition">Logout</button>
      </>
    );
  }
  return (
    <>
      <a href="/login" className="text-slate-600 hover:text-primary-600 font-semibold transition-colors duration-200">Login</a>
      <a href="/register" className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-primary-100 ml-2">Join Us</a>
    </>
  );
};

export default App;
