# Flight Booking System - Quick Start Guide

## Prerequisites Check
- [ ] Node.js installed (v16+)
- [ ] MongoDB installed and running
- [ ] npm or yarn installed

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Start MongoDB
Ensure MongoDB is running on your system:
- **Windows**: Open MongoDB Compass or Services
- **Linux/Mac**: `sudo systemctl start mongod`

### 4. Seed Database
```bash
cd backend
npm run seed
```

### 5. Start Backend Server
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

### 6. Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

## Quick Test
1. Open http://localhost:3000
2. Browse flights
3. Book a flight
4. Check booking history
5. Download ticket PDF

## Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running
- Check connection string in backend/.env

**Port Already in Use**
- Change PORT in backend/.env
- Or kill process on port 5000/3000

**Dependencies Installation Failed**
- Delete node_modules folders
- Run `npm install` again

## API Endpoints (for testing)

### Get Flights
```bash
curl http://localhost:5000/api/flights/search
```

### Get Wallet Balance
```bash
curl http://localhost:5000/api/wallet/balance
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

Enjoy building! 🚀
