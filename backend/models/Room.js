const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  description: String,
  detailed_description: String,
  price_per_night: { type: Number, required: true },
  images: [String],
  features: [String],
  amenities: [String],
  max_guests: Number,
  bed_type: String,
  size_sqm: Number,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', roomSchema);