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
// Replace with your connection string if using MongoDB Atlas
const MONGODB_URI =  "mongodb+srv://kaushikcourse9_db_user:hWFpDsYjMPOx6xAn@cluster0.ajo74d9.mongodb.net/";

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

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));