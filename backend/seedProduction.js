// Run this script to seed production database on Render
// Usage: node seedProduction.js

import fetch from 'node-fetch';

const API_URL = 'https://xtechon-assignment.onrender.com/api';

async function seedProduction() {
  try {
    console.log('🔍 Checking production API health...');
    const health = await fetch(`${API_URL}/health`);
    console.log('✅ API is responding');
    
    console.log('\n📊 Checking existing flights...');
    const searchResponse = await fetch(`${API_URL}/flights/search`);
    const searchData = await searchResponse.json();
    console.log(`Found ${searchData.count} flights in production database`);
    
    if (searchData.count === 0) {
      console.log('\n⚠️  No flights found in production database');
      console.log('You need to run the seed script on Render:');
      console.log('1. Go to your Render dashboard');
      console.log('2. Open your service');
      console.log('3. Go to Shell tab');
      console.log('4. Run: npm run seed');
    } else {
      console.log('\n✅ Production database is seeded with flights');
      console.log(`\nSample flights:`);
      searchData.data.slice(0, 3).forEach(flight => {
        console.log(`  - ${flight.flight_id}: ${flight.departure_city} → ${flight.arrival_city} (₹${flight.base_price})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

seedProduction();
