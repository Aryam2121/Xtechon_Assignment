import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Flight from './models/Flight.js';
import Wallet from './models/Wallet.js';

dotenv.config();

const seedFlights = [
  {
    flight_id: 'AI101',
    airline: 'Air India',
    departure_city: 'Delhi',
    arrival_city: 'Mumbai',
    base_price: 2500,
    departure_time: '08:00',
    arrival_time: '10:30',
    duration: '2h 30m'
  },
  {
    flight_id: 'UK202',
    airline: 'Vistara',
    departure_city: 'Mumbai',
    arrival_city: 'Bangalore',
    base_price: 2200,
    departure_time: '09:30',
    arrival_time: '11:15',
    duration: '1h 45m'
  },
  {
    flight_id: 'SG303',
    airline: 'SpiceJet',
    departure_city: 'Bangalore',
    arrival_city: 'Hyderabad',
    base_price: 2000,
    departure_time: '12:00',
    arrival_time: '13:00',
    duration: '1h 00m'
  },
  {
    flight_id: 'IN404',
    airline: 'IndiGo',
    departure_city: 'Delhi',
    arrival_city: 'Kolkata',
    base_price: 2800,
    departure_time: '06:00',
    arrival_time: '08:30',
    duration: '2h 30m'
  },
  {
    flight_id: 'AI505',
    airline: 'Air India',
    departure_city: 'Hyderabad',
    arrival_city: 'Chennai',
    base_price: 2100,
    departure_time: '14:00',
    arrival_time: '15:15',
    duration: '1h 15m'
  },
  {
    flight_id: 'UK606',
    airline: 'Vistara',
    departure_city: 'Delhi',
    arrival_city: 'Bangalore',
    base_price: 2600,
    departure_time: '16:00',
    arrival_time: '18:45',
    duration: '2h 45m'
  },
  {
    flight_id: 'SG707',
    airline: 'SpiceJet',
    departure_city: 'Kolkata',
    arrival_city: 'Mumbai',
    base_price: 2700,
    departure_time: '10:00',
    arrival_time: '12:45',
    duration: '2h 45m'
  },
  {
    flight_id: 'IN808',
    airline: 'IndiGo',
    departure_city: 'Mumbai',
    arrival_city: 'Pune',
    base_price: 2050,
    departure_time: '13:30',
    arrival_time: '14:15',
    duration: '45m'
  },
  {
    flight_id: 'AI909',
    airline: 'Air India',
    departure_city: 'Pune',
    arrival_city: 'Goa',
    base_price: 2400,
    departure_time: '15:00',
    arrival_time: '16:00',
    duration: '1h 00m'
  },
  {
    flight_id: 'UK010',
    airline: 'Vistara',
    departure_city: 'Goa',
    arrival_city: 'Bangalore',
    base_price: 2300,
    departure_time: '17:30',
    arrival_time: '19:00',
    duration: '1h 30m'
  },
  {
    flight_id: 'SG111',
    airline: 'SpiceJet',
    departure_city: 'Delhi',
    arrival_city: 'Jaipur',
    base_price: 2150,
    departure_time: '07:00',
    arrival_time: '08:15',
    duration: '1h 15m'
  },
  {
    flight_id: 'IN212',
    airline: 'IndiGo',
    departure_city: 'Jaipur',
    arrival_city: 'Ahmedabad',
    base_price: 2250,
    departure_time: '11:00',
    arrival_time: '12:30',
    duration: '1h 30m'
  },
  {
    flight_id: 'AI313',
    airline: 'Air India',
    departure_city: 'Ahmedabad',
    arrival_city: 'Mumbai',
    base_price: 2600,
    departure_time: '14:30',
    arrival_time: '16:00',
    duration: '1h 30m'
  },
  {
    flight_id: 'UK414',
    airline: 'Vistara',
    departure_city: 'Bangalore',
    arrival_city: 'Kochi',
    base_price: 2450,
    departure_time: '09:00',
    arrival_time: '10:30',
    duration: '1h 30m'
  },
  {
    flight_id: 'SG515',
    airline: 'SpiceJet',
    departure_city: 'Kochi',
    arrival_city: 'Chennai',
    base_price: 2350,
    departure_time: '13:00',
    arrival_time: '14:15',
    duration: '1h 15m'
  },
  {
    flight_id: 'IN616',
    airline: 'IndiGo',
    departure_city: 'Hyderabad',
    arrival_city: 'Pune',
    base_price: 2550,
    departure_time: '08:30',
    arrival_time: '10:00',
    duration: '1h 30m'
  },
  {
    flight_id: 'AI717',
    airline: 'Air India',
    departure_city: 'Mumbai',
    arrival_city: 'Kolkata',
    base_price: 2950,
    departure_time: '18:00',
    arrival_time: '21:00',
    duration: '3h 00m'
  },
  {
    flight_id: 'UK818',
    airline: 'Vistara',
    departure_city: 'Delhi',
    arrival_city: 'Goa',
    base_price: 2850,
    departure_time: '10:30',
    arrival_time: '13:00',
    duration: '2h 30m'
  },
  {
    flight_id: 'SG919',
    airline: 'SpiceJet',
    departure_city: 'Chennai',
    arrival_city: 'Bangalore',
    base_price: 2100,
    departure_time: '06:30',
    arrival_time: '07:30',
    duration: '1h 00m'
  },
  {
    flight_id: 'IN020',
    airline: 'IndiGo',
    departure_city: 'Bangalore',
    arrival_city: 'Delhi',
    base_price: 3000,
    departure_time: '20:00',
    arrival_time: '23:00',
    duration: '3h 00m'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data
    await Flight.deleteMany({});
    await Wallet.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert flights
    await Flight.insertMany(seedFlights);
    console.log(`✅ Seeded ${seedFlights.length} flights`);

    // Initialize default wallet
    await Wallet.create({
      user_id: 'default_user',
      balance: 50000,
      transactions: []
    });
    console.log('✅ Initialized wallet with ₹50,000');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
