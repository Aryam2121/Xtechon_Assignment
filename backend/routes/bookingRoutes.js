import express from 'express';
import { createBooking, getAllBookings, downloadTicket } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/create', createBooking);
router.get('/history', getAllBookings);
router.get('/download/:pnr', downloadTicket);

export default router;
