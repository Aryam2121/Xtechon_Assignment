import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    default: 'default_user',
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default: 50000
  },
  transactions: [{
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
