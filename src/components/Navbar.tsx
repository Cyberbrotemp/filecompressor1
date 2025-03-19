import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { LogOut, User, FileBox, Code } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-800">
            FileConverter Pro
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <FileBox className="w-5 h-5 mr-1" />
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <User className="w-5 h-5 mr-1" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/developer"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Code className="w-5 h-5 mr-1" />
              Developer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar