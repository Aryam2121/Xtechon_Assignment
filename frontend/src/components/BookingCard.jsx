import React from 'react';
import { downloadTicket } from '../services/api';

const BookingCard = ({ booking }) => {
  const handleDownload = () => {
    const url = downloadTicket(booking.pnr);
    window.open(url, '_blank');
  };

  return (
    <div className="card p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{booking.airline}</h3>
          <p className="text-gray-600 text-sm">PNR: {booking.pnr}</p>
        </div>
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
          ✓ Confirmed
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-sm">Passenger</p>
          <p className="font-semibold">{booking.passenger_name}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Flight ID</p>
          <p className="font-semibold">{booking.flight_id}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-sm">From</p>
          <p className="font-semibold">{booking.departure_city}</p>
          <p className="text-xs text-gray-600">{booking.departure_time}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">To</p>
          <p className="font-semibold">{booking.arrival_city}</p>
          <p className="text-xs text-gray-600">{booking.arrival_time}</p>
        </div>
      </div>

      <div className="pt-4 border-t flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Booking Date</p>
          <p className="font-medium">
            {new Date(booking.booking_date).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}
          </p>
          <p className="text-xl font-bold text-blue-600 mt-2">₹{booking.final_price}</p>
        </div>

        <button
          onClick={handleDownload}
          className="btn-primary flex items-center space-x-2"
        >
          <span>📥</span>
          <span>Download Ticket</span>
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
