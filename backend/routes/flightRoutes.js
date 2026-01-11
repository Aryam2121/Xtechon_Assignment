import express from 'express';
import { searchFlights, trackBookingAttempt } from '../controllers/flightController.js';

const router = express.Router();

router.get('/search', searchFlights);
router.post('/track-attempt', trackBookingAttempt);

export default router;
