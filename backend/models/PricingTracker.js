import mongoose from 'mongoose';

const pricingTrackerSchema = new mongoose.Schema({
  flight_id: {
    type: String,
    required: true
  },
  booking_attempts: [{
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  current_surge_percentage: {
    type: Number,
    default: 0
  },
  surge_applied_at: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const PricingTracker = mongoose.model('PricingTracker', pricingTrackerSchema);

export default PricingTracker;
