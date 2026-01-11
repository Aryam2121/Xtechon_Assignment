import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const location = useLocation();
  const { balance, loading } = useWallet();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">✈️</span>
            <span className="text-xl font-bold">FlightBooker</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition ${isActive('/')}`}
            >
              Search Flights
            </Link>
            <Link
              to="/bookings"
              className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition ${isActive('/bookings')}`}
            >
              My Bookings
            </Link>
            <div className="bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold">
              💰 Wallet: {loading ? '...' : `₹${balance.toLocaleString('en-IN')}`}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
