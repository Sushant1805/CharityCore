const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'pending', 'failed'], default: 'success' },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
