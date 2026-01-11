# 🚀 Quick Installation Commands

Copy and paste these commands to set up the Flight Booking System quickly.

---

## Windows (PowerShell)

### Step 1: Navigate to Backend and Install
```powershell
cd backend
npm install
```

### Step 2: Seed Database
```powershell
npm run seed
```

### Step 3: Start Backend (Keep this terminal open)
```powershell
npm run dev
```

### Step 4: Open New Terminal, Navigate to Frontend
```powershell
cd frontend
npm install
```

### Step 5: Start Frontend
```powershell
npm run dev
```

---

## Linux / Mac (Bash)

### Step 1: Navigate to Backend and Install
```bash
cd backend && npm install
```

### Step 2: Seed Database
```bash
npm run seed
```

### Step 3: Start Backend (Keep this terminal open)
```bash
npm run dev
```

### Step 4: Open New Terminal, Navigate to Frontend
```bash
cd frontend && npm install
```

### Step 5: Start Frontend
```bash
npm run dev
```

---

## One-Line Install (Advanced)

### Backend Setup & Start
```bash
cd backend && npm install && npm run seed && npm run dev
```

### Frontend Setup & Start (New Terminal)
```bash
cd frontend && npm install && npm run dev
```

---

## Verification Commands

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

### Check Frontend
Open browser: http://localhost:3000

### Check Database
```bash
mongosh
use flight_booking
db.flights.countDocuments()
# Should return: 20
exit
```

---

## Reset Everything

### Clear and Reseed Database
```bash
mongosh
use flight_booking
db.dropDatabase()
exit

cd backend
npm run seed
```

### Reinstall All Dependencies
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Common Issues

### MongoDB Not Running
```bash
# Windows
# Open Services → Start MongoDB

# Linux
sudo systemctl start mongod

# Mac
brew services start mongodb-community
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

---

## Ready to Go! 🎉

Once both servers are running:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/health

Happy booking! ✈️
