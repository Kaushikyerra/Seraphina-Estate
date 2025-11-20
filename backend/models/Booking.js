const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  room_name: String,
  guest_name: String,
  guest_email: String,
  guest_phone: String,
  check_in_date: Date,
  check_out_date: Date,
  num_adults: Number,
  num_children: Number,
  num_rooms: Number,
  total_price: Number,
  status: { type: String, default: 'confirmed' },
  confirmation_number: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);