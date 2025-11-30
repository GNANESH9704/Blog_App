// server/src/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ---------------------- CORS Setup ----------------------
const allowedOrigins = [
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173']),
  'http://localhost:5174', // add Vite dev port
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests like Postman (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// ---------------------- Middleware ----------------------
app.use(express.json());

// ---------------------- MongoDB Connection ----------------------
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error', err));

// ---------------------- Routes ----------------------
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ---------------------- Error Handler ----------------------
app.use(errorHandler);

module.exports = app;
