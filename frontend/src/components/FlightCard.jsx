import React, { useState } from 'react';
import { trackBookingAttempt, createBooking } from '../services/api';
import { useWallet } from '../context/WalletContext';

const FlightCard = ({ flight, onBookingSuccess }) => {
  const { balance, refreshBalance } = useWallet();
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [passengerName, setPassengerName] = useState('');
  const [currentPrice, setCurrentPrice] = useState(flight.current_price || flight.base_price);
  const [surgePercentage, setSurgePercentage] = useState(flight.surge_percentage || 0);

  const handleBookNow = async () => {
    setLoading(true);
    try {
      // Track booking attempt and get updated price
      const response = await trackBookingAttempt(flight.flight_id);
      if (response.data.success) {
        setCurrentPrice(response.data.data.current_price);
        setSurgePercentage(response.data.data.surge_percentage);
      }
      setShowBookingForm(true);
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!passengerName.trim()) {
      alert('Please enter passenger name');
      return;
    }

    if (balance < currentPrice) {
      alert(`Insufficient balance! You need ₹${currentPrice} but have ₹${balance}`);
      return;
    }

    setLoading(true);
    try {
      const response = await createBooking({
        passenger_name: passengerName,
        flight_id: flight.flight_id
      });

      if (response.data.success) {
        alert('Booking successful! Your ticket has been generated.');
        setShowBookingForm(false);
        setPassengerName('');
        refreshBalance();
        if (onBookingSuccess) onBookingSuccess();
      }
    } catch (error) {
      alert('Booking failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{flight.airline}</h3>
          <p className="text-gray-600 text-sm">Flight {flight.flight_id}</p>
        </div>
        {surgePercentage > 0 && (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            🔥 {surgePercentage}% Surge
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-sm">From</p>
          <p className="font-semibold text-lg">{flight.departure_city}</p>
          <p className="text-sm text-gray-600">{flight.departure_time}</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-xs">Duration</p>
            <p className="text-gray-600 font-medium">{flight.duration}</p>
            <div className="flex items-center justify-center mt-1">
              <div className="h-px w-8 bg-gray-300"></div>
              <span className="text-gray-400 mx-1">✈️</span>
              <div className="h-px w-8 bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm">To</p>
          <p className="font-semibold text-lg">{flight.arrival_city}</p>
          <p className="text-sm text-gray-600">{flight.arrival_time}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          {surgePercentage > 0 && (
            <p className="text-sm text-gray-500 line-through">₹{flight.base_price}</p>
          )}
          <p className="text-2xl font-bold text-blue-600">₹{currentPrice}</p>
          <p className="text-xs text-gray-500">per person</p>
        </div>

        {!showBookingForm ? (
          <button
            onClick={handleBookNow}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Book Now'}
          </button>
        ) : (
          <form onSubmit={handleConfirmBooking} className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Passenger Name"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="input-field"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Confirm'}
            </button>
            <button
              type="button"
              onClick={() => setShowBookingForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
