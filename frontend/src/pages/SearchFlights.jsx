import React, { useState, useEffect } from 'react';
import FlightCard from '../components/FlightCard';
import { searchFlights } from '../services/api';

const SearchFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const params = {};
      if (departureCity) params.departure_city = departureCity;
      if (arrivalCity) params.arrival_city = arrivalCity;

      const response = await searchFlights(params);
      if (response.data.success) {
        setFlights(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      alert('Error fetching flights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  const handleReset = () => {
    setDepartureCity('');
    setArrivalCity('');
    fetchFlights();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Search Flights</h1>
        <p className="text-gray-600">Find and book your perfect flight</p>
      </div>

      {/* Search Form */}
      <div className="card p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From (Departure City)
            </label>
            <input
              type="text"
              placeholder="e.g., Delhi, Mumbai"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To (Arrival City)
            </label>
            <input
              type="text"
              placeholder="e.g., Bangalore, Kolkata"
              value={arrivalCity}
              onChange={(e) => setArrivalCity(e.target.value)}
              className="input-field"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            🔍 Search
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
            disabled={loading}
          >
            Reset
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Available Flights {flights.length > 0 && `(${flights.length})`}
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading flights...</p>
        </div>
      ) : flights.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">No flights found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div>
          {flights.map((flight) => (
            <FlightCard
              key={flight.flight_id}
              flight={flight}
              onBookingSuccess={fetchFlights}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFlights;
