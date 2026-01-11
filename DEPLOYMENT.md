# 🚀 Deployment Guide

This guide covers deploying the Flight Booking System to production.

---

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] MongoDB connection works
- [ ] Both frontend and backend run without errors
- [ ] Environment variables configured
- [ ] Git repository is up to date

---

## 🗄️ Database Deployment (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a new cluster (M0 Free tier)

### Step 2: Configure Database
1. Click "Connect" on your cluster
2. Add IP address: `0.0.0.0/0` (allow from anywhere)
3. Create database user with username and password
4. Get connection string

### Step 3: Update Backend
Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flight_booking?retryWrites=true&w=majority
```

### Step 4: Seed Database
```bash
cd backend
npm run seed
```

---

## 🖥️ Backend Deployment (Render.com)

### Step 1: Prepare Backend
1. Ensure `backend/package.json` has start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### Step 2: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Sign up and connect GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: flight-booking-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables
In Render dashboard:
- `PORT`: 5000
- `MONGODB_URI`: (your Atlas connection string)
- `NODE_ENV`: production

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment
- Note the URL: `https://flight-booking-backend.onrender.com`

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Update API URL
Edit `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://flight-booking-backend.onrender.com/api'
  : 'http://localhost:5000/api';
```

### Step 2: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"
4. Select your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist

### Step 3: Deploy
- Click "Deploy"
- Wait for deployment
- Your site will be at: `https://your-app.vercel.app`

---

## 🔄 Alternative: Deploy to Railway

### Backend on Railway
1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub repo
4. Set root directory to `backend`
5. Add environment variables
6. Deploy

### MongoDB on Railway
Railway also offers PostgreSQL/MongoDB add-ons if you prefer.

---

## 🐳 Docker Deployment (Optional)

### Create Dockerfile for Backend
`backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Create Dockerfile for Frontend
`frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
`docker-compose.yml`:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/flight_booking
      - PORT=5000
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Run:
```bash
docker-compose up -d
```

---

## 🔐 Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
```

### Frontend (if using .env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## ✅ Post-Deployment Verification

### Test Backend
```bash
curl https://your-backend.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Flight Booking API is running"
}
```

### Test Frontend
1. Visit your Vercel URL
2. Search for flights
3. Book a flight
4. Check booking history
5. Download PDF ticket

---

## 🐛 Common Deployment Issues

### Issue: CORS Error
**Solution**: Add your frontend URL to backend CORS config

`backend/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000']
}));
```

### Issue: MongoDB Connection Failed
**Solution**: Check:
- IP whitelist includes `0.0.0.0/0`
- Username/password are correct
- Connection string is properly formatted

### Issue: PDF Download Not Working
**Solution**: Ensure backend has write permissions for `tickets/` folder

### Issue: Build Fails on Vercel
**Solution**: Check:
- All dependencies are in `package.json`
- No import errors
- Build command is correct

---

## 📊 Performance Optimization

### Backend
- Enable compression: `npm install compression`
- Add rate limiting: `npm install express-rate-limit`
- Cache responses where appropriate

### Frontend
- Lazy load routes
- Optimize images
- Enable code splitting

### Database
- Add indexes for frequently queried fields
- Use projection to limit returned fields

---

## 🔄 CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install Backend Dependencies
        run: cd backend && npm install
      
      - name: Install Frontend Dependencies
        run: cd frontend && npm install
      
      - name: Build Frontend
        run: cd frontend && npm run build
      
      - name: Deploy
        run: echo "Deploy to your hosting provider"
```

---

## 📱 Monitoring & Maintenance

### Set Up Monitoring
- Use Render/Vercel built-in logs
- Set up error tracking (Sentry)
- Monitor API response times

### Regular Maintenance
- Update dependencies monthly
- Check for security vulnerabilities
- Backup database regularly

---

## 🎉 Deployment Complete!

Your Flight Booking System is now live! 🚀

Share your deployment URLs:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

---

## 📞 Need Help?

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Review error messages

**Happy Deploying! ✈️**
