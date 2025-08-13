import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import session from "express-session";
import passport from "passport";

// Routes
import userRoutes from './routes/user.route.js';
import matchRoutes from './routes/match.route.js';
import notificationRoutes from './routes/notification.route.js';
import searchRoutes from "./routes/search.route.js";
import authRoutes from "./routes/auth.route.js"; // ✅ NEW Google Auth route

// Load env & passport config
dotenv.config();
import "./config/passport.js";

const app = express();
const port = process.env.PORT || 4001;
const DB_URI = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Your React app URL
  credentials: true,
}));

// ✅ Session setup (needed for Passport)
app.use(
  session({
    secret: process.env.JWT_SECRET || "yoursecret",
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect(DB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/search", searchRoutes);
app.use("/auth", authRoutes); // ✅ Google login

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
