# 🔧 Troubleshooting Guide

Common issues and their solutions for the Flight Booking System.

---

## 🗄️ Database Issues

### MongoDB Connection Failed

**Error**: `MongoDB connection failed: connect ECONNREFUSED`

**Solutions**:
1. **Check if MongoDB is running**:
   ```bash
   # Windows
   - Open Services → Find "MongoDB" → Start
   - Or open MongoDB Compass
   
   # Linux/Mac
   sudo systemctl start mongod
   sudo systemctl status mongod
   ```

2. **Verify connection string** in `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/flight_booking
   ```

3. **Check port 27017** is not blocked:
   ```bash
   netstat -an | findstr 27017
   ```

---

### Database Seeding Failed

**Error**: `Seeding error: ...`

**Solutions**:
1. **Ensure MongoDB is running first**
2. **Clear existing data** (if needed):
   ```bash
   # Connect to MongoDB
   mongosh
   use flight_booking
   db.dropDatabase()
   exit
   ```
3. **Run seed script again**:
   ```bash
   cd backend
   npm run seed
   ```

---

### Cannot Find Database

**Error**: `Database 'flight_booking' not found`

**Solution**: The database is created automatically on first connection. Just ensure:
- MongoDB is running
- Connection string is correct
- Run the seed script

---

## 🖥️ Backend Issues

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:
1. **Change port** in `backend/.env`:
   ```env
   PORT=5001
   ```

2. **Kill process on port 5000** (Windows):
   ```bash
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   ```

3. **Kill process on port 5000** (Linux/Mac):
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

---

### Module Not Found

**Error**: `Error: Cannot find module 'express'`

**Solution**: Install dependencies:
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

### ES Module Error

**Error**: `SyntaxError: Cannot use import statement outside a module`

**Solution**: Ensure `backend/package.json` has:
```json
{
  "type": "module"
}
```

---

## 🌐 Frontend Issues

### Cannot Start Frontend Server

**Error**: `Error: Cannot find module 'vite'`

**Solution**: Install dependencies:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. **Ensure backend has CORS enabled** (`backend/server.js`):
   ```javascript
   import cors from 'cors';
   app.use(cors());
   ```

2. **Check both servers are running**:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

3. **Verify API URL** in `frontend/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

---

### Blank Page After Build

**Issue**: Production build shows blank page

**Solutions**:
1. **Check browser console** for errors
2. **Verify build output**:
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```
3. **Ensure all dependencies are installed**

---

### TailwindCSS Not Working

**Issue**: Styles not applying

**Solutions**:
1. **Check `tailwind.config.js` content paths**:
   ```javascript
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ]
   ```

2. **Verify `index.css` has Tailwind directives**:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Restart dev server**:
   ```bash
   npm run dev
   ```

---

## 🎫 Booking & PDF Issues

### PDF Generation Failed

**Error**: `Error generating PDF`

**Solutions**:
1. **Check `tickets/` folder exists**:
   ```bash
   mkdir backend/tickets
   ```

2. **Verify folder permissions** (Linux/Mac):
   ```bash
   chmod 755 backend/tickets
   ```

3. **Check PDFKit is installed**:
   ```bash
   cd backend
   npm list pdfkit
   ```

---

### PDF Download Not Working

**Issue**: Download button doesn't work

**Solutions**:
1. **Check PDF file exists** in `backend/tickets/`
2. **Verify download URL** is correct:
   ```javascript
   http://localhost:5000/api/bookings/download/<PNR>
   ```
3. **Check browser console** for errors
4. **Try opening in new tab** instead of direct download

---

### Booking Failed - Insufficient Balance

**Issue**: Cannot book even with sufficient balance

**Solutions**:
1. **Check wallet balance**:
   ```bash
   curl http://localhost:5000/api/wallet/balance
   ```

2. **Add money to wallet**:
   ```bash
   curl -X POST http://localhost:5000/api/wallet/add-money \
     -H "Content-Type: application/json" \
     -d '{"amount":10000}'
   ```

3. **Check surge pricing** - price may have increased

---

## ⚡ Dynamic Pricing Issues

### Surge Pricing Not Working

**Issue**: Price doesn't increase after multiple attempts

**Solutions**:
1. **Check PricingTracker collection** exists
2. **Verify time logic** - must be 3 attempts within 5 minutes
3. **Check server logs** for tracking errors
4. **Clear pricing tracker** (if needed):
   ```bash
   mongosh
   use flight_booking
   db.pricingtrackers.deleteMany({})
   ```

---

### Surge Not Resetting

**Issue**: Price stays high after 10 minutes

**Solutions**:
1. **Refresh the page** - frontend caches may be outdated
2. **Check server time** is accurate
3. **Manually reset** pricing:
   ```bash
   mongosh
   use flight_booking
   db.pricingtrackers.updateMany({}, {$set: {current_surge_percentage: 0, surge_applied_at: null}})
   ```

---

## 🔐 Environment Variables

### Environment Variables Not Loading

**Issue**: `process.env.PORT` is undefined

**Solutions**:
1. **Check `.env` file exists** in backend folder
2. **Ensure `dotenv` is imported** at top of `server.js`:
   ```javascript
   import dotenv from 'dotenv';
   dotenv.config();
   ```
3. **Restart server** after changing `.env`

---

## 🌍 Network Issues

### Cannot Connect to Backend from Frontend

**Issue**: All API calls fail

**Solutions**:
1. **Check backend is running**:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Verify API URL** in frontend:
   ```javascript
   // frontend/src/services/api.js
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

3. **Check firewall settings** - ensure ports 3000 and 5000 are allowed

---

### Slow API Responses

**Issue**: API takes too long to respond

**Solutions**:
1. **Check MongoDB performance** - add indexes:
   ```javascript
   db.flights.createIndex({ flight_id: 1 })
   db.bookings.createIndex({ pnr: 1 })
   ```

2. **Optimize queries** - use projections:
   ```javascript
   Flight.find().select('flight_id airline base_price')
   ```

3. **Check network connection**

---

## 📦 Dependency Issues

### npm Install Fails

**Error**: `npm ERR! code ERESOLVE`

**Solutions**:
1. **Use legacy peer deps**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Clear npm cache**:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Update npm**:
   ```bash
   npm install -g npm@latest
   ```

---

### Version Conflicts

**Issue**: Package version incompatibilities

**Solution**: Use exact versions from `package.json` provided

---

## 🔍 Debugging Tips

### Enable Detailed Logging

**Backend** (`server.js`):
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend** (check browser DevTools):
- Open Console tab
- Check Network tab for API calls
- Look for red errors

---

### Check API Responses

**Using cURL**:
```bash
# Health check
curl http://localhost:5000/api/health

# Get flights
curl http://localhost:5000/api/flights/search

# Get wallet
curl http://localhost:5000/api/wallet/balance
```

**Using Browser**:
- Open http://localhost:5000/api/health
- Should see JSON response

---

### MongoDB Shell Commands

```bash
# Connect
mongosh

# Switch to database
use flight_booking

# View collections
show collections

# Count documents
db.flights.countDocuments()
db.bookings.countDocuments()

# View sample data
db.flights.findOne()
db.bookings.find().limit(3)

# Clear collection
db.bookings.deleteMany({})

# Exit
exit
```

---

## 🆘 Still Having Issues?

### Checklist
- [ ] MongoDB is running
- [ ] Both backend and frontend servers are running
- [ ] All dependencies are installed
- [ ] .env file exists with correct values
- [ ] Port 5000 and 3000 are not blocked
- [ ] Database has been seeded

### Clean Restart
```bash
# Stop all servers
# Then:

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📝 Reporting Issues

If you find a bug:
1. Check this troubleshooting guide first
2. Review error messages carefully
3. Check browser console and server logs
4. Try the "Clean Restart" procedure
5. Document steps to reproduce

---

## ✅ System Health Check

Run these commands to verify everything is working:

```bash
# 1. Check MongoDB
mongosh --eval "db.version()"

# 2. Check Node.js
node --version

# 3. Check npm
npm --version

# 4. Test backend
curl http://localhost:5000/api/health

# 5. Check frontend
curl http://localhost:3000
```

Expected: All commands should succeed without errors.

---

**Need more help? Review the [README.md](README.md) for detailed setup instructions.**
