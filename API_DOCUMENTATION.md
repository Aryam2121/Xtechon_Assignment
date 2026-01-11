# API Testing Collection

## Base URL
```
http://localhost:5000/api
```

## 1. Health Check
**GET** `/health`

Response:
```json
{
  "success": true,
  "message": "Flight Booking API is running",
  "timestamp": "2026-01-11T..."
}
```

---

## 2. Search All Flights
**GET** `/flights/search`

Response:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "flight_id": "AI101",
      "airline": "Air India",
      "departure_city": "Delhi",
      "arrival_city": "Mumbai",
      "base_price": 2500,
      "current_price": 2500,
      "surge_percentage": 0,
      "departure_time": "08:00",
      "arrival_time": "10:30",
      "duration": "2h 30m"
    }
  ]
}
```

---

## 3. Search Flights by City
**GET** `/flights/search?departure_city=Delhi&arrival_city=Mumbai`

Query Parameters:
- `departure_city` (optional): Filter by departure city
- `arrival_city` (optional): Filter by arrival city

---

## 4. Track Booking Attempt
**POST** `/flights/track-attempt`

Request Body:
```json
{
  "flight_id": "AI101"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "flight_id": "AI101",
    "base_price": 2500,
    "current_price": 2750,
    "surge_percentage": 10,
    "attempts_count": 3
  }
}
```

---

## 5. Create Booking
**POST** `/bookings/create`

Request Body:
```json
{
  "passenger_name": "John Doe",
  "flight_id": "AI101"
}
```

Response:
```json
{
  "success": true,
  "message": "Booking successful",
  "data": {
    "booking": {
      "pnr": "FLT2A3B4C5D",
      "passenger_name": "John Doe",
      "flight_id": "AI101",
      "airline": "Air India",
      "departure_city": "Delhi",
      "arrival_city": "Mumbai",
      "final_price": 2750,
      "booking_date": "2026-01-11T...",
      "departure_time": "08:00",
      "arrival_time": "10:30"
    },
    "wallet_balance": 47250,
    "pdf_generated": true
  }
}
```

Error (Insufficient Balance):
```json
{
  "success": false,
  "message": "Insufficient wallet balance",
  "required": 2500,
  "available": 1000
}
```

---

## 6. Get Booking History
**GET** `/bookings/history`

Response:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "pnr": "FLT2A3B4C5D",
      "passenger_name": "John Doe",
      "flight_id": "AI101",
      "airline": "Air India",
      "departure_city": "Delhi",
      "arrival_city": "Mumbai",
      "final_price": 2750,
      "booking_date": "2026-01-11T...",
      "departure_time": "08:00",
      "arrival_time": "10:30"
    }
  ]
}
```

---

## 7. Download Ticket PDF
**GET** `/bookings/download/:pnr`

Example: `/bookings/download/FLT2A3B4C5D`

Returns: PDF file download

---

## 8. Get Wallet Balance
**GET** `/wallet/balance`

Response:
```json
{
  "success": true,
  "data": {
    "balance": 47250,
    "transactions": [
      {
        "type": "debit",
        "amount": 2750,
        "description": "Flight booking - AI101 (Delhi to Mumbai)",
        "date": "2026-01-11T..."
      }
    ]
  }
}
```

---

## 9. Add Money to Wallet
**POST** `/wallet/add-money`

Request Body:
```json
{
  "amount": 5000
}
```

Response:
```json
{
  "success": true,
  "message": "Money added successfully",
  "data": {
    "balance": 52250
  }
}
```

---

## Testing with cURL

### Search Flights
```bash
curl http://localhost:5000/api/flights/search
```

### Track Booking Attempt
```bash
curl -X POST http://localhost:5000/api/flights/track-attempt \
  -H "Content-Type: application/json" \
  -d '{"flight_id":"AI101"}'
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings/create \
  -H "Content-Type: application/json" \
  -d '{"passenger_name":"John Doe","flight_id":"AI101"}'
```

### Get Wallet Balance
```bash
curl http://localhost:5000/api/wallet/balance
```

---

## Testing with Postman

1. Import this collection
2. Set base URL variable: `http://localhost:5000/api`
3. Run requests in sequence:
   - Health Check
   - Search Flights
   - Track Attempt (3 times within 5 min to trigger surge)
   - Create Booking
   - Get Booking History
   - Download Ticket

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (dev mode only)"
}
```

Common Status Codes:
- `200`: Success
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Server Error
