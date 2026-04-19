require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      objectSrc: ["'none'"], // Fixes fallback warning
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://*"], // Restricted wildcard
      connectSrc: ["'self'", "http://127.0.0.1:5000", "http://localhost:5000", "ws://localhost:5173"]
    },
  },
  xFrameOptions: { action: "deny" },
  xContentTypeOptions: true, // nosniff
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ngo_portal';

const User = require('./models/User');

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    try {
      const adminExists = await User.findOne({ email: 'admin@cc.com' });
      if (!adminExists) {
        await User.create({
          name: 'Main Admin',
          email: 'admin@cc.com',
          password: '12345678',
          role: 'admin'
        });
        console.log('Admin user seeded (admin@cc.com)');
      }
    } catch (err) {
      console.error('Error seeding admin:', err);
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

const server = app.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});
