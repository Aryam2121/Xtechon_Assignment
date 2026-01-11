import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchFlights from './pages/SearchFlights';
import BookingHistory from './pages/BookingHistory';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchFlights />} />
            <Route path="/bookings" element={<BookingHistory />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
