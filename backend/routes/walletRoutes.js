import express from 'express';
import { getWalletBalance, addMoney } from '../controllers/walletController.js';

const router = express.Router();

router.get('/balance', getWalletBalance);
router.post('/add-money', addMoney);

export default router;
