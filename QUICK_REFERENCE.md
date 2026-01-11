# 📋 Quick Reference Card

One-page reference for the Flight Booking System.

---

## ⚡ Quick Start (3 Commands)

```bash
# 1. Backend
cd backend && npm install && npm run seed && npm run dev

# 2. Frontend (new terminal)
cd frontend && npm install && npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 🔗 Essential URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `http://localhost:3000` | React UI |
| Backend | `http://localhost:5000` | Express API |
| Health | `http://localhost:5000/api/health` | API status |
| MongoDB | `mongodb://localhost:27017` | Database |

---

## 📁 Key Files

| File | Location | Purpose |
|------|----------|---------|
| Backend Entry | `backend/server.js` | Express server |
| Frontend Entry | `frontend/src/main.jsx` | React app |
| Database Seed | `backend/seedDatabase.js` | Seed 20 flights |
| API Service | `frontend/src/services/api.js` | API calls |
| Wallet Context | `frontend/src/context/WalletContext.jsx` | Global state |
| PDF Generator | `backend/utils/pdfGenerator.js` | Ticket PDFs |

---

## 📡 API Cheat Sheet

### Flights
```bash
# Search all
GET /api/flights/search

# Search by city
GET /api/flights/search?departure_city=Delhi

# Track attempt
POST /api/flights/track-attempt
Body: {"flight_id": "AI101"}
```

### Bookings
```bash
# Create booking
POST /api/bookings/create
Body: {"passenger_name": "John", "flight_id": "AI101"}

# Get history
GET /api/bookings/history

# Download ticket
GET /api/bookings/download/FLT2A3B4C5D
```

### Wallet
```bash
# Get balance
GET /api/wallet/balance

# Add money
POST /api/wallet/add-money
Body: {"amount": 5000}
```

---

## 🗄️ MongoDB Quick Commands

```bash
# Connect
mongosh

# Use database
use flight_booking

# View collections
show collections

# Count flights
db.flights.countDocuments()  # Should be 20

# Count bookings
db.bookings.countDocuments()

# View sample flight
db.flights.findOne()

# View all bookings
db.bookings.find().pretty()

# Reset wallet
db.wallets.updateOne({}, {$set: {balance: 50000}})

# Clear bookings
db.bookings.deleteMany({})

# Exit
exit
```

---

## 🎯 Dynamic Pricing Rules

| Trigger | Action | Duration |
|---------|--------|----------|
| 3 attempts in 5 min | +10% surge | 10 minutes |
| After 10 min | Reset to base | - |

**Example**:
- Base: ₹2,500
- Surged: ₹2,750
- After 10 min: ₹2,500

---

## 💰 Wallet Logic

```
Initial Balance: ₹50,000

On Booking:
  IF balance >= flight_price:
    balance = balance - flight_price
    CREATE booking
  ELSE:
    REJECT with error
```

---

## 📝 Common Tasks

### Add More Flights
Edit `backend/seedDatabase.js`, add to array, run:
```bash
npm run seed
```

### Reset Database
```bash
mongosh
use flight_booking
db.dropDatabase()
exit

cd backend
npm run seed
```

### Change Port
Edit `backend/.env`:
```env
PORT=5001
```

### Clear All Bookings
```bash
mongosh
use flight_booking
db.bookings.deleteMany({})
db.pricingtrackers.deleteMany({})
db.wallets.updateOne({}, {$set: {balance: 50000, transactions: []}})
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB not connecting | Start MongoDB service |
| Port in use | Change PORT in .env |
| CORS error | Ensure both servers running |
| No flights showing | Run `npm run seed` |
| PDF download fails | Check `tickets/` folder exists |
| Wallet not updating | Refresh page or check console |

---

## 📦 Dependencies Overview

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `pdfkit` - PDF generation
- `uuid` - PNR generation

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - CSS framework

---

## 🎨 UI Components

```
├── Navbar - Logo, links, wallet balance
├── FlightCard - Flight details + booking form
├── BookingCard - Booking details + download
├── SearchFlights - Search page with filters
└── BookingHistory - List of all bookings
```

---

## 🔑 Key Features Locations

| Feature | Backend | Frontend |
|---------|---------|----------|
| Flight Search | `flightController.js` | `SearchFlights.jsx` |
| Surge Pricing | `PricingTracker.js` | `FlightCard.jsx` |
| Booking | `bookingController.js` | `FlightCard.jsx` |
| Wallet | `walletController.js` | `WalletContext.jsx` |
| PDF | `pdfGenerator.js` | `BookingCard.jsx` |
| History | `bookingController.js` | `BookingHistory.jsx` |

---

## 📊 Test Data

**Sample Flight IDs**: AI101, UK202, SG303, IN404, AI505

**Sample Cities**: Delhi, Mumbai, Bangalore, Hyderabad, Chennai

**Default Wallet**: ₹50,000

**Flight Price Range**: ₹2,000 - ₹3,000

---

## 🚀 Deployment Checklist

- [ ] MongoDB Atlas setup
- [ ] Update MONGODB_URI in backend
- [ ] Deploy backend (Render/Railway)
- [ ] Update API_BASE_URL in frontend
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Test all features
- [ ] Share URLs

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete project guide |
| `SETUP.md` | Quick start instructions |
| `API_DOCUMENTATION.md` | API endpoint details |
| `FEATURES.md` | Feature completion checklist |
| `ARCHITECTURE.md` | System architecture diagrams |
| `DEPLOYMENT.md` | Production deployment guide |
| `TROUBLESHOOTING.md` | Common issues & solutions |
| `PROJECT_SUMMARY.md` | Project overview |
| `QUICK_REFERENCE.md` | This file |

---

## 🎯 Testing Workflow

1. **Search** - Search all flights
2. **Filter** - Filter by city
3. **Surge** - Click "Book Now" 3x on same flight
4. **Book** - Enter name and confirm
5. **Wallet** - Check balance decreased
6. **History** - View in booking history
7. **PDF** - Download ticket
8. **Reset** - Wait 10 min, verify price reset

---

## 💡 Pro Tips

- Use MongoDB Compass for visual database inspection
- Check browser console for frontend errors
- Check terminal for backend errors
- Use Postman/cURL to test APIs directly
- Keep documentation open while coding
- Run `npm run seed` to reset flights
- Use git for version control

---

## 📞 Help Resources

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review [README.md](README.md) setup
3. Check server/browser console logs
4. Verify MongoDB is running
5. Ensure all dependencies installed

---

## ⚡ Performance Tips

- Add MongoDB indexes: `db.flights.createIndex({flight_id: 1})`
- Use React.memo for components
- Implement API response caching
- Optimize images and assets
- Use production builds for deployment

---

## 🎉 Success Criteria

✅ All 20 flights visible  
✅ Search/filter works  
✅ Surge pricing triggers  
✅ Booking succeeds  
✅ Wallet deducts correctly  
✅ PDF downloads  
✅ History shows bookings  
✅ No console errors

---

**Keep this card handy for quick reference!** 📌
