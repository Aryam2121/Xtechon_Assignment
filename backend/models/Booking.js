import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  pnr: {
    type: String,
    required: true,
    unique: true
  },
  passenger_name: {
    type: String,
    required: true
  },
  flight_id: {
    type: String,
    required: true
  },
  airline: {
    type: String,
    required: true
  },
  departure_city: {
    type: String,
    required: true
  },
  arrival_city: {
    type: String,
    required: true
  },
  final_price: {
    type: Number,
    required: true
  },
  booking_date: {
    type: Date,
    default: Date.now
  },
  departure_time: {
    type: String,
    required: true
  },
  arrival_time: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
