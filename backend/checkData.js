import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Flight from './models/Flight.js';

dotenv.config();

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flight_booking');
    console.log('✅ MongoDB connected');
    
    const count = await Flight.countDocuments();
    console.log(`📊 Total flights in database: ${count}`);
    
    const allFlights = await Flight.find().limit(5);
    console.log('\n🛫 Sample flights:');
    allFlights.forEach(flight => {
      console.log(`- ${flight.flight_id}: ${flight.departure_city} → ${flight.arrival_city}`);
    });
    
    const delhiFlights = await Flight.find({ departure_city: /delhi/i });
    console.log(`\n✈️  Flights from Delhi: ${delhiFlights.length}`);
    
    const bangaloreFlights = await Flight.find({ arrival_city: /bangalore/i });
    console.log(`✈️  Flights to Bangalore: ${bangaloreFlights.length}`);
    
    const delhiBangalore = await Flight.find({ 
      departure_city: /delhi/i,
      arrival_city: /bangalore/i 
    });
    console.log(`✈️  Direct Delhi → Bangalore flights: ${delhiBangalore.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkData();
