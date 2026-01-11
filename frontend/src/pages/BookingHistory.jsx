import React, { useState, useEffect } from 'react';
import BookingCard from '../components/BookingCard';
import { getBookingHistory } from '../services/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookingHistory();
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Error fetching booking history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Booking History</h1>
        <p className="text-gray-600">View all your past and upcoming bookings</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">No bookings found</p>
          <p className="text-gray-500 mt-2">Book your first flight to see it here!</p>
          <a href="/" className="btn-primary inline-block mt-6">
            Search Flights
          </a>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Total Bookings: {bookings.length}
            </h2>
          </div>
          {bookings.map((booking) => (
            <BookingCard key={booking.pnr} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
