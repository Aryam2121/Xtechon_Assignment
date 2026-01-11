import express from 'express';
import Flight from '../models/Flight.js';
import Wallet from '../models/Wallet.js';
import PricingTracker from '../models/PricingTracker.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Admin endpoint to seed database (DELETE IN PRODUCTION AFTER USE!)
router.post('/seed', async (req, res) => {
  try {
    // Clear existing data
    await Flight.deleteMany({});
    await Wallet.deleteMany({});
    await PricingTracker.deleteMany({});
    await Booking.deleteMany({});

    // Seed flights
    const seedFlights = [
      {
        flight_id: 'AI101', airline: 'Air India',
        departure_city: 'Delhi', arrival_city: 'Mumbai',
        base_price: 2500, departure_time: '08:00', arrival_time: '10:30', duration: '2h 30m'
      },
      {
        flight_id: 'UK202', airline: 'Vistara',
        departure_city: 'Mumbai', arrival_city: 'Bangalore',
        base_price: 2200, departure_time: '09:30', arrival_time: '11:15', duration: '1h 45m'
      },
      {
        flight_id: 'SG303', airline: 'SpiceJet',
        departure_city: 'Bangalore', arrival_city: 'Hyderabad',
        base_price: 2000, departure_time: '12:00', arrival_time: '13:00', duration: '1h 00m'
      },
      {
        flight_id: 'IN404', airline: 'IndiGo',
        departure_city: 'Delhi', arrival_city: 'Kolkata',
        base_price: 2800, departure_time: '06:00', arrival_time: '08:30', duration: '2h 30m'
      },
      {
        flight_id: 'AI505', airline: 'Air India',
        departure_city: 'Hyderabad', arrival_city: 'Chennai',
        base_price: 2100, departure_time: '14:00', arrival_time: '15:15', duration: '1h 15m'
      },
      {
        flight_id: 'UK606', airline: 'Vistara',
        departure_city: 'Delhi', arrival_city: 'Bangalore',
        base_price: 2600, departure_time: '16:00', arrival_time: '18:45', duration: '2h 45m'
      },
      {
        flight_id: 'SG707', airline: 'SpiceJet',
        departure_city: 'Kolkata', arrival_city: 'Mumbai',
        base_price: 2700, departure_time: '10:00', arrival_time: '12:45', duration: '2h 45m'
      },
      {
        flight_id: 'IN808', airline: 'IndiGo',
        departure_city: 'Mumbai', arrival_city: 'Pune',
        base_price: 2050, departure_time: '13:30', arrival_time: '14:15', duration: '45m'
      },
      {
        flight_id: 'AI909', airline: 'Air India',
        departure_city: 'Pune', arrival_city: 'Goa',
        base_price: 2400, departure_time: '15:00', arrival_time: '16:00', duration: '1h 00m'
      },
      {
        flight_id: 'UK010', airline: 'Vistara',
        departure_city: 'Goa', arrival_city: 'Bangalore',
        base_price: 2300, departure_time: '17:00', arrival_time: '18:15', duration: '1h 15m'
      },
      {
        flight_id: 'SG111', airline: 'SpiceJet',
        departure_city: 'Chennai', arrival_city: 'Jaipur',
        base_price: 2900, departure_time: '07:00', arrival_time: '09:30', duration: '2h 30m'
      },
      {
        flight_id: 'IN212', airline: 'IndiGo',
        departure_city: 'Jaipur', arrival_city: 'Ahmedabad',
        base_price: 2200, departure_time: '11:00', arrival_time: '12:15', duration: '1h 15m'
      },
      {
        flight_id: 'AI313', airline: 'Air India',
        departure_city: 'Ahmedabad', arrival_city: 'Kochi',
        base_price: 2800, departure_time: '14:30', arrival_time: '17:00', duration: '2h 30m'
      },
      {
        flight_id: 'UK414', airline: 'Vistara',
        departure_city: 'Kochi', arrival_city: 'Delhi',
        base_price: 3000, departure_time: '19:00', arrival_time: '22:00', duration: '3h 00m'
      },
      {
        flight_id: 'SG515', airline: 'SpiceJet',
        departure_city: 'Delhi', arrival_city: 'Hyderabad',
        base_price: 2400, departure_time: '05:30', arrival_time: '07:45', duration: '2h 15m'
      },
      {
        flight_id: 'IN616', airline: 'IndiGo',
        departure_city: 'Bangalore', arrival_city: 'Mumbai',
        base_price: 2350, departure_time: '20:00', arrival_time: '21:45', duration: '1h 45m'
      },
      {
        flight_id: 'AI717', airline: 'Air India',
        departure_city: 'Mumbai', arrival_city: 'Chennai',
        base_price: 2600, departure_time: '08:30', arrival_time: '10:45', duration: '2h 15m'
      },
      {
        flight_id: 'UK818', airline: 'Vistara',
        departure_city: 'Kolkata', arrival_city: 'Bangalore',
        base_price: 2750, departure_time: '12:30', arrival_time: '15:00', duration: '2h 30m'
      },
      {
        flight_id: 'SG919', airline: 'SpiceJet',
        departure_city: 'Pune', arrival_city: 'Delhi',
        base_price: 2500, departure_time: '06:30', arrival_time: '08:45', duration: '2h 15m'
      },
      {
        flight_id: 'IN020', airline: 'IndiGo',
        departure_city: 'Hyderabad', arrival_city: 'Kolkata',
        base_price: 2650, departure_time: '16:30', arrival_time: '18:45', duration: '2h 15m'
      }
    ];

    await Flight.insertMany(seedFlights);

    // Initialize wallet
    await Wallet.create({
      user_id: 'default_user',
      balance: 50000,
      transaction_history: []
    });

    res.json({
      success: true,
      message: 'Database seeded successfully',
      flights: seedFlights.length,
      wallet: 50000
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message
    });
  }
});

export default router;
