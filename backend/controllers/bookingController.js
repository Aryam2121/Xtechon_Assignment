import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import Wallet from '../models/Wallet.js';
import PricingTracker from '../models/PricingTracker.js';
import { generatePNR } from '../utils/helpers.js';
import { generateTicketPDF } from '../utils/pdfGenerator.js';
import path from 'path';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { passenger_name, flight_id } = req.body;

    if (!passenger_name || !flight_id) {
      return res.status(400).json({
        success: false,
        message: 'Passenger name and flight ID are required'
      });
    }

    // Get flight details
    const flight = await Flight.findOne({ flight_id });
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    // Get current pricing
    const pricingTracker = await PricingTracker.findOne({ flight_id });
    let finalPrice = flight.base_price;

    if (pricingTracker && pricingTracker.current_surge_percentage > 0) {
      // Check if surge is still valid (within 10 minutes)
      const tenMinutes = 10 * 60 * 1000;
      const timeSinceSurge = Date.now() - new Date(pricingTracker.surge_applied_at).getTime();
      
      if (timeSinceSurge < tenMinutes) {
        finalPrice = flight.base_price * (1 + pricingTracker.current_surge_percentage / 100);
      }
    }

    finalPrice = Math.round(finalPrice);

    // Check wallet balance
    let wallet = await Wallet.findOne({ user_id: 'default_user' });
    if (!wallet) {
      wallet = await Wallet.create({
        user_id: 'default_user',
        balance: 50000
      });
    }

    if (wallet.balance < finalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient wallet balance',
        required: finalPrice,
        available: wallet.balance
      });
    }

    // Deduct from wallet
    wallet.balance -= finalPrice;
    wallet.transactions.push({
      type: 'debit',
      amount: finalPrice,
      description: `Flight booking - ${flight_id} (${flight.departure_city} to ${flight.arrival_city})`
    });
    await wallet.save();

    // Create booking
    const pnr = generatePNR();
    const booking = await Booking.create({
      pnr,
      passenger_name,
      flight_id: flight.flight_id,
      airline: flight.airline,
      departure_city: flight.departure_city,
      arrival_city: flight.arrival_city,
      final_price: finalPrice,
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time
    });

    // Generate PDF ticket
    const pdfPath = await generateTicketPDF(booking);

    res.json({
      success: true,
      message: 'Booking successful',
      data: {
        booking: booking,
        wallet_balance: wallet.balance,
        pdf_generated: true
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ booking_date: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Download ticket PDF
export const downloadTicket = async (req, res) => {
  try {
    const { pnr } = req.params;

    const booking = await Booking.findOne({ pnr });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const filename = `ticket_${pnr}.pdf`;
    const filepath = path.join(process.cwd(), 'tickets', filename);

    // Check if file exists, if not generate it
    const fs = await import('fs');
    if (!fs.existsSync(filepath)) {
      await generateTicketPDF(booking);
    }

    res.download(filepath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({
          success: false,
          message: 'Error downloading ticket'
        });
      }
    });
  } catch (error) {
    console.error('Download ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading ticket',
      error: error.message
    });
  }
};
