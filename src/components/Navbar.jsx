// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

const Navbar = ({ onLogout }) => {
  const isLoggedIn = !!getToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <nav className="sticky top-0 bg-white shadow z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">up<span className="text-gray-800"> Linked up</span></Link>
        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              <Link to="/register" className="text-blue-600 hover:underline">Join Now</Link>
            </>
          ) : (
            <>
              <Link
                to="/create"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                + Post
              </Link>
              <Link
                to="/profile/me"
                className="text-blue-600 font-medium hover:underline"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 border border-gray-400 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
