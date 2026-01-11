import Wallet from '../models/Wallet.js';

// Get wallet balance
export const getWalletBalance = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user_id: 'default_user' });
    
    if (!wallet) {
      wallet = await Wallet.create({
        user_id: 'default_user',
        balance: 50000,
        transactions: []
      });
    }

    res.json({
      success: true,
      data: {
        balance: wallet.balance,
        transactions: wallet.transactions.slice(-10).reverse() // Last 10 transactions
      }
    });
  } catch (error) {
    console.error('Get wallet error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wallet balance',
      error: error.message
    });
  }
};

// Add money to wallet (optional feature)
export const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    let wallet = await Wallet.findOne({ user_id: 'default_user' });
    
    if (!wallet) {
      wallet = await Wallet.create({
        user_id: 'default_user',
        balance: 50000
      });
    }

    wallet.balance += amount;
    wallet.transactions.push({
      type: 'credit',
      amount,
      description: 'Wallet top-up'
    });

    await wallet.save();

    res.json({
      success: true,
      message: 'Money added successfully',
      data: {
        balance: wallet.balance
      }
    });
  } catch (error) {
    console.error('Add money error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding money to wallet',
      error: error.message
    });
  }
};
