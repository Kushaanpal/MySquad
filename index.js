import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;
const DB_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(DB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
