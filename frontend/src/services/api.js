import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Flight APIs
export const searchFlights = (params = {}) => {
  return api.get('/flights/search', { params });
};

export const trackBookingAttempt = (flightId) => {
  return api.post('/flights/track-attempt', { flight_id: flightId });
};

// Booking APIs
export const createBooking = (data) => {
  return api.post('/bookings/create', data);
};

export const getBookingHistory = () => {
  return api.get('/bookings/history');
};

export const downloadTicket = (pnr) => {
  return `${API_BASE_URL}/bookings/download/${pnr}`;
};

// Wallet APIs
export const getWalletBalance = () => {
  return api.get('/wallet/balance');
};

export const addMoneyToWallet = (amount) => {
  return api.post('/wallet/add-money', { amount });
};

export default api;
