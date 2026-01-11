# 📂 Complete File Structure

Comprehensive listing of all files in the Flight Booking System.

---

## 🌳 Project Tree

```
flight-booking-system/
│
├── 📄 README.md                          # Main project documentation
├── 📄 SETUP.md                           # Quick start guide
├── 📄 API_DOCUMENTATION.md               # API endpoint reference
├── 📄 FEATURES.md                        # Feature completion checklist
├── 📄 ARCHITECTURE.md                    # System architecture diagrams
├── 📄 DEPLOYMENT.md                      # Production deployment guide
├── 📄 TROUBLESHOOTING.md                 # Common issues & solutions
├── 📄 PROJECT_SUMMARY.md                 # Project overview
├── 📄 QUICK_REFERENCE.md                 # Quick reference card
├── 📄 FILE_STRUCTURE.md                  # This file
├── 📄 package.json                       # Root package file
├── 📄 .gitignore                         # Git ignore rules
│
├── 📁 backend/                           # Node.js/Express Backend
│   │
│   ├── 📄 package.json                   # Backend dependencies
│   ├── 📄 package-lock.json              # Lock file
│   ├── 📄 .env                           # Environment variables
│   ├── 📄 .env.example                   # Example env file
│   ├── 📄 .gitignore                     # Backend git ignore
│   ├── 📄 server.js                      # Express server entry point
│   ├── 📄 seedDatabase.js                # Database seeding script
│   │
│   ├── 📁 config/                        # Configuration files
│   │   └── 📄 database.js                # MongoDB connection
│   │
│   ├── 📁 models/                        # Mongoose models
│   │   ├── 📄 Flight.js                  # Flight schema
│   │   ├── 📄 Booking.js                 # Booking schema
│   │   ├── 📄 Wallet.js                  # Wallet schema
│   │   └── 📄 PricingTracker.js          # Pricing tracker schema
│   │
│   ├── 📁 controllers/                   # Business logic
│   │   ├── 📄 flightController.js        # Flight operations
│   │   ├── 📄 bookingController.js       # Booking operations
│   │   └── 📄 walletController.js        # Wallet operations
│   │
│   ├── 📁 routes/                        # API routes
│   │   ├── 📄 flightRoutes.js            # Flight endpoints
│   │   ├── 📄 bookingRoutes.js           # Booking endpoints
│   │   └── 📄 walletRoutes.js            # Wallet endpoints
│   │
│   ├── 📁 utils/                         # Utility functions
│   │   ├── 📄 pdfGenerator.js            # PDF ticket generation
│   │   └── 📄 helpers.js                 # Helper functions (PNR)
│   │
│   └── 📁 tickets/                       # Generated PDF tickets
│       └── 📄 .gitkeep                   # Keep empty folder in git
│
└── 📁 frontend/                          # React Frontend
    │
    ├── 📄 package.json                   # Frontend dependencies
    ├── 📄 package-lock.json              # Lock file
    ├── 📄 .gitignore                     # Frontend git ignore
    ├── 📄 index.html                     # HTML entry point
    ├── 📄 vite.config.js                 # Vite configuration
    ├── 📄 tailwind.config.js             # Tailwind configuration
    ├── 📄 postcss.config.js              # PostCSS configuration
    │
    └── 📁 src/                           # Source code
        │
        ├── 📄 main.jsx                   # React entry point
        ├── 📄 App.jsx                    # Main App component
        ├── 📄 index.css                  # Global styles + Tailwind
        │
        ├── 📁 components/                # Reusable components
        │   ├── 📄 Navbar.jsx             # Navigation bar
        │   ├── 📄 FlightCard.jsx         # Flight display & booking
        │   └── 📄 BookingCard.jsx        # Booking display & download
        │
        ├── 📁 pages/                     # Route pages
        │   ├── 📄 SearchFlights.jsx      # Flight search page
        │   └── 📄 BookingHistory.jsx     # Booking history page
        │
        ├── 📁 services/                  # API services
        │   └── 📄 api.js                 # Axios API calls
        │
        └── 📁 context/                   # React Context
            └── 📄 WalletContext.jsx      # Wallet global state
```

---

## 📊 File Statistics

### Total Files
- **Backend**: 20 files
- **Frontend**: 13 files
- **Documentation**: 10 files
- **Total**: 43 files

### Lines of Code (Approx)
- **Backend**: ~2,000 lines
- **Frontend**: ~1,500 lines
- **Documentation**: ~5,000 lines
- **Total**: ~8,500 lines

---

## 📝 File Descriptions

### Root Level

#### README.md
Complete project documentation including:
- Features overview
- Tech stack
- Installation instructions
- API documentation
- Database schema
- Usage guide
- Troubleshooting

#### SETUP.md
Quick start guide with:
- Prerequisites checklist
- Step-by-step installation
- Quick test instructions
- Common issues

#### API_DOCUMENTATION.md
Comprehensive API reference:
- All endpoints documented
- Request/response examples
- cURL commands
- Postman collection info

#### FEATURES.md
Feature completion checklist:
- All assignment requirements
- Implementation status
- Testing instructions
- Evaluation criteria coverage

#### ARCHITECTURE.md
System architecture documentation:
- High-level architecture diagram
- Request flow diagrams
- Database relationships
- Component hierarchy
- State management flow

#### DEPLOYMENT.md
Production deployment guide:
- MongoDB Atlas setup
- Render/Railway deployment
- Vercel/Netlify deployment
- Docker setup (optional)
- CI/CD configuration

#### TROUBLESHOOTING.md
Common issues and solutions:
- Database problems
- Backend issues
- Frontend issues
- Booking/PDF problems
- Environment variables
- Debugging tips

#### PROJECT_SUMMARY.md
Quick project overview:
- Tech stack summary
- Key features
- Quick start (3 steps)
- API endpoints table
- Database collections
- Testing checklist

#### QUICK_REFERENCE.md
One-page quick reference:
- Essential URLs
- Key files
- API cheat sheet
- MongoDB commands
- Common tasks
- Pro tips

---

## 🔧 Backend Files

### server.js
Main Express server file:
- App initialization
- Middleware setup (CORS, JSON parsing)
- Route mounting
- Error handling
- Server startup

### seedDatabase.js
Database seeding script:
- 20 flight records
- Initial wallet setup (₹50,000)
- Connects to MongoDB
- Clears existing data
- Seeds fresh data

### config/database.js
MongoDB connection configuration:
- Uses Mongoose
- Connects to local/Atlas MongoDB
- Error handling
- Environment variable usage

### models/Flight.js
Flight Mongoose schema:
- flight_id (unique)
- airline
- departure/arrival cities
- base_price (₹2000-3000)
- times and duration
- Timestamps enabled

### models/Booking.js
Booking Mongoose schema:
- pnr (unique)
- passenger_name
- flight details
- final_price
- booking_date
- Timestamps enabled

### models/Wallet.js
Wallet Mongoose schema:
- user_id (default: "default_user")
- balance (default: 50000)
- transactions array
- Transaction schema (type, amount, description, date)

### models/PricingTracker.js
Pricing tracker schema:
- flight_id
- booking_attempts array
- current_surge_percentage
- surge_applied_at timestamp

### controllers/flightController.js
Flight business logic:
- searchFlights(): Query DB, apply pricing
- trackBookingAttempt(): Track attempts, apply surge

### controllers/bookingController.js
Booking business logic:
- createBooking(): Validate wallet, create booking, generate PDF
- getAllBookings(): Fetch all bookings
- downloadTicket(): Serve PDF file

### controllers/walletController.js
Wallet business logic:
- getWalletBalance(): Fetch balance and transactions
- addMoney(): Add money to wallet (bonus feature)

### routes/flightRoutes.js
Flight API routes:
- GET /search
- POST /track-attempt

### routes/bookingRoutes.js
Booking API routes:
- POST /create
- GET /history
- GET /download/:pnr

### routes/walletRoutes.js
Wallet API routes:
- GET /balance
- POST /add-money

### utils/pdfGenerator.js
PDF generation utility:
- Uses PDFKit
- Professional ticket design
- All required fields
- Colors and formatting
- Saves to tickets/ folder

### utils/helpers.js
Helper functions:
- generatePNR(): Creates unique PNR (FLT + UUID)

---

## 🎨 Frontend Files

### main.jsx
React entry point:
- Imports React and ReactDOM
- Renders App component
- Imports global CSS

### App.jsx
Main application component:
- Router setup (BrowserRouter)
- WalletProvider wrapper
- Route definitions
- Navbar inclusion

### index.css
Global styles:
- Tailwind directives
- Custom CSS classes
- Button styles (btn-primary, btn-secondary)
- Card styles
- Input field styles

### components/Navbar.jsx
Navigation component:
- Logo and branding
- Navigation links (Search, Bookings)
- Wallet balance display
- Active link highlighting
- Responsive design

### components/FlightCard.jsx
Flight display and booking:
- Flight details display
- Surge pricing badge
- Route visualization
- Booking form (passenger name)
- Price calculation
- Wallet validation
- Booking submission

### components/BookingCard.jsx
Booking display:
- Booking details
- Confirmed badge
- Flight information
- Passenger name
- Download ticket button
- Formatted dates

### pages/SearchFlights.jsx
Flight search page:
- Search form (departure/arrival)
- Filter functionality
- Flight results display
- Loading states
- Empty state
- Uses FlightCard component

### pages/BookingHistory.jsx
Booking history page:
- Fetches all bookings
- Displays BookingCard for each
- Loading states
- Empty state (no bookings)
- Sorted by date (newest first)

### services/api.js
API service layer:
- Axios instance configuration
- Base URL setup
- All API functions:
  - searchFlights()
  - trackBookingAttempt()
  - createBooking()
  - getBookingHistory()
  - downloadTicket()
  - getWalletBalance()
  - addMoneyToWallet()

### context/WalletContext.jsx
Global wallet state:
- React Context API
- Balance state
- Loading state
- fetchBalance() function
- refreshBalance() function
- useWallet() hook
- WalletProvider component

---

## ⚙️ Configuration Files

### backend/package.json
Backend dependencies:
- express, mongoose, cors, dotenv
- pdfkit, uuid
- nodemon (dev)
- Scripts: start, dev, seed

### frontend/package.json
Frontend dependencies:
- react, react-dom, react-router-dom
- axios, tailwindcss
- vite
- Scripts: dev, build, preview

### vite.config.js
Vite configuration:
- React plugin
- Dev server port (3000)
- Proxy to backend (/api → :5000)

### tailwind.config.js
Tailwind CSS configuration:
- Content paths
- Custom colors (primary, secondary)
- Theme extensions

### postcss.config.js
PostCSS configuration:
- Tailwind CSS plugin
- Autoprefixer plugin

### .env
Environment variables:
- PORT=5000
- MONGODB_URI
- NODE_ENV

---

## 🎯 Key File Relationships

### Data Flow
```
User Action → Component → API Service → Backend Route → 
Controller → Model → MongoDB → Response → Component → UI Update
```

### Specific Example: Booking
```
FlightCard.jsx → api.createBooking() → 
POST /api/bookings/create → bookingRoutes.js → 
bookingController.createBooking() → 
Booking.create() + Wallet.save() + generateTicketPDF() → 
Response → FlightCard updates → WalletContext refreshes
```

---

## 📌 Important Notes

### Backend
- All files use ES6 modules (`import`/`export`)
- `type: "module"` in package.json
- Environment variables loaded via dotenv
- CORS enabled for all origins
- Error handling in all controllers

### Frontend
- React 18 with functional components
- Context API for global state
- Axios for API calls
- TailwindCSS for styling
- React Router for navigation
- No class components used

### Database
- MongoDB with Mongoose ODM
- 4 collections (flights, bookings, wallets, pricingtrackers)
- Unique indexes on key fields
- Timestamps enabled on all schemas

---

## ✅ File Completion Status

All required files are complete and functional:

- ✅ All backend files implemented
- ✅ All frontend files implemented
- ✅ All configuration files set up
- ✅ Comprehensive documentation created
- ✅ Git ignore files configured
- ✅ Example files provided

---

## 🚀 Next Steps

To use this project:
1. Review [README.md](README.md) for setup
2. Follow [SETUP.md](SETUP.md) for installation
3. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands
4. Refer to [TROUBLESHOOTING.md](TROUBLESHOOTING.md) if issues arise

---

**Complete file structure documented!** 📁✨
