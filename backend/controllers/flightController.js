import Flight from '../models/Flight.js';
import PricingTracker from '../models/PricingTracker.js';

// Get all flights with dynamic pricing
export const searchFlights = async (req, res) => {
  try {
    const { departure_city, arrival_city } = req.query;
    
    let query = {};
    if (departure_city) {
      query.departure_city = new RegExp(departure_city, 'i');
    }
    if (arrival_city) {
      query.arrival_city = new RegExp(arrival_city, 'i');
    }

    const flights = await Flight.find(query).limit(10);

    // Get pricing information for each flight
    const flightsWithPricing = await Promise.all(
      flights.map(async (flight) => {
        const pricing = await PricingTracker.findOne({ flight_id: flight.flight_id });
        
        let currentPrice = flight.base_price;
        let surgePercentage = 0;

        if (pricing && pricing.current_surge_percentage > 0) {
          // Check if 10 minutes have passed since surge was applied
          const tenMinutes = 10 * 60 * 1000;
          const timeSinceSurge = Date.now() - new Date(pricing.surge_applied_at).getTime();
          
          if (timeSinceSurge < tenMinutes) {
            surgePercentage = pricing.current_surge_percentage;
            currentPrice = flight.base_price * (1 + surgePercentage / 100);
          } else {
            // Reset surge pricing after 10 minutes
            await PricingTracker.findOneAndUpdate(
              { flight_id: flight.flight_id },
              {
                current_surge_percentage: 0,
                surge_applied_at: null,
                booking_attempts: []
              }
            );
          }
        }

        return {
          ...flight.toObject(),
          current_price: Math.round(currentPrice),
          surge_percentage: surgePercentage
        };
      })
    );

    res.json({
      success: true,
      count: flightsWithPricing.length,
      data: flightsWithPricing
    });
  } catch (error) {
    console.error('Search flights error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching flights',
      error: error.message
    });
  }
};

// Track booking attempt and apply surge pricing if needed
export const trackBookingAttempt = async (req, res) => {
  try {
    const { flight_id } = req.body;

    if (!flight_id) {
      return res.status(400).json({
        success: false,
        message: 'Flight ID is required'
      });
    }

    const flight = await Flight.findOne({ flight_id });
    
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    let pricingTracker = await PricingTracker.findOne({ flight_id });

    if (!pricingTracker) {
      pricingTracker = new PricingTracker({
        flight_id,
        booking_attempts: [{ timestamp: new Date() }],
        current_surge_percentage: 0
      });
    } else {
      // Check if surge was applied and if 10 minutes have passed
      if (pricingTracker.surge_applied_at) {
        const tenMinutes = 10 * 60 * 1000;
        const timeSinceSurge = Date.now() - new Date(pricingTracker.surge_applied_at).getTime();
        
        if (timeSinceSurge >= tenMinutes) {
          // Reset after 10 minutes
          pricingTracker.booking_attempts = [{ timestamp: new Date() }];
          pricingTracker.current_surge_percentage = 0;
          pricingTracker.surge_applied_at = null;
        } else {
          // Still within surge period
          pricingTracker.booking_attempts.push({ timestamp: new Date() });
        }
      } else {
        // Filter attempts within last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        pricingTracker.booking_attempts = pricingTracker.booking_attempts.filter(
          attempt => new Date(attempt.timestamp) > fiveMinutesAgo
        );
        
        pricingTracker.booking_attempts.push({ timestamp: new Date() });

        // Apply surge if 3 attempts within 5 minutes
        if (pricingTracker.booking_attempts.length >= 3 && pricingTracker.current_surge_percentage === 0) {
          pricingTracker.current_surge_percentage = 10;
          pricingTracker.surge_applied_at = new Date();
        }
      }
    }

    await pricingTracker.save();

    const currentPrice = flight.base_price * (1 + pricingTracker.current_surge_percentage / 100);

    res.json({
      success: true,
      data: {
        flight_id,
        base_price: flight.base_price,
        current_price: Math.round(currentPrice),
        surge_percentage: pricingTracker.current_surge_percentage,
        attempts_count: pricingTracker.booking_attempts.length
      }
    });
  } catch (error) {
    console.error('Track booking attempt error:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking booking attempt',
      error: error.message
    });
  }
};
