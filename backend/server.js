/* eslint-env node */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Models
const Room = require('./models/Room');
const Booking = require('./models/Booking');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Database Connection ---
// Prefer using `MONGODB_URI` from environment for credentials.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotel_booking';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- Routes ---

// 1. Get All Rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Get Single Room
app.get('/api/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Create Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Get User Bookings (By Email)
app.get('/api/bookings', async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { guest_email: email } : {};
    const bookings = await Booking.find(query).sort({ created_at: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. Seeder Endpoint (Run this once to populate DB)
app.post('/api/seed', async (req, res) => {
  try {
    await Room.deleteMany({});
    const sampleRooms = [
      {
        name: "Deluxe Ocean Suite",
        type: "executive_suite",
        description: "Breathtaking ocean views with a private balcony.",
        detailed_description: "Experience the pinnacle of luxury in our Deluxe Ocean Suite. Featuring panoramic views of the crystal-clear waters, a king-sized bed with Egyptian cotton linens, and a spacious private terrace.",
        price_per_night: 450,
        images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80"],
        features: ["Ocean View", "King Bed", "Private Balcony", "Jacuzzi"],
        amenities: ["Free Wi-Fi", "Mini Bar", "Room Service", "Smart TV"],
        max_guests: 2,
        bed_type: "King Bed",
        size_sqm: 65
      },
      {
        name: "Presidential Villa",
        type: "presidential_villa",
        description: "The ultimate private sanctuary with a personal pool.",
        detailed_description: "Our Presidential Villa offers unmatched privacy and opulence. Enjoy your own infinity pool, a private chef on request, and direct beach access.",
        price_per_night: 1200,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"],
        features: ["Private Pool", "Direct Beach Access", "Butler Service"],
        amenities: ["All Inclusive", "Private Gym", "Home Cinema"],
        max_guests: 6,
        bed_type: "3 King Beds",
        size_sqm: 250
      },
      {
        name: "Garden View Room",
        type: "garden_view_room",
        description: "Serene views of our lush tropical gardens.",
        detailed_description: "Relax amidst nature in our Garden View Room. The floor-to-ceiling windows open up to our award-winning tropical gardens.",
        price_per_night: 280,
        images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80"],
        features: ["Garden View", "Rain Shower"],
        amenities: ["Coffee Maker", "Safe", "Work Desk"],
        max_guests: 2,
        bed_type: "Queen Bed",
        size_sqm: 40
      }
    ];
    await Room.insertMany(sampleRooms);
    res.json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Contact endpoint - receive messages from frontend and store/log them
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    // For now, just log the message and return success.
    // In a real app you'd store this to a collection or send an email.
    console.log('Contact message received:', { name, email, phone, message });
    return res.status(201).json({ message: 'Message received' });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return res.status(500).json({ error: error.message });
  }
});

// --- Simple OTP endpoints (in-memory store - suitable for dev/testing) ---
const otpStore = {}; // { key: { code, expiresAt } }

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

app.post('/api/send-otp', (req, res) => {
  try {
    const { email, phone } = req.body;
    const key = email || phone;
    if (!key) return res.status(400).json({ message: 'email or phone required' });

    const code = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore[key] = { code, expiresAt };

    // In a real app you would send via email/SMS here. For now log to server console.
    console.log(`OTP for ${key}: ${code} (expires in 5 minutes)`);

    return res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error('Error in /api/send-otp:', err);
    return res.status(500).json({ message: err.message });
  }
});

app.post('/api/verify-otp', (req, res) => {
  try {
    const { key, code } = req.body;
    if (!key || !code) return res.status(400).json({ message: 'key and code are required' });

    const entry = otpStore[key];
    if (!entry) return res.status(400).json({ message: 'No OTP found for key' });
    if (Date.now() > entry.expiresAt) {
      delete otpStore[key];
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (entry.code !== code.toString()) return res.status(400).json({ message: 'Invalid OTP' });

    // success
    delete otpStore[key];
    return res.json({ message: 'Verified' });
  } catch (err) {
    console.error('Error in /api/verify-otp:', err);
    return res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));