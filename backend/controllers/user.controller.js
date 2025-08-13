import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register NEW User
 export const registerUser = async (req, res) => {
  try {
    const { username, email, password, location, sportsInterests } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      location,
      sportsInterests,
    });
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'ID not registered' });
    }
    
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    // create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.status(200).json({ message: 'Login successful', token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error: error.message });
  }
};
// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, email, location, sportsInterests } = req.body;

    // Check if there are any changes
    const isSame =
      (username === undefined || username === user.username) &&
      (email === undefined || email === user.email) &&
      (location === undefined || location === user.location) &&
      (sportsInterests === undefined ||
        JSON.stringify(sportsInterests) === JSON.stringify(user.sportsInterests));

    if (isSame) {
      return res.status(200).json({ message: "No updates made. All values are same." });
    }

    // Apply only changed fields
    if (username && username !== user.username) user.username = username;
    if (email && email !== user.email) user.email = email;
    if (location && location !== user.location) user.location = location;
    if (
      sportsInterests &&
      JSON.stringify(sportsInterests) !== JSON.stringify(user.sportsInterests)
    ) {
      user.sportsInterests = sportsInterests;
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile", error: error.message });
  }
};
//get nearby users according to nearby location(10 km)
export const getNearbyUsers = async (req, res) => {
  let { location, sportsInterests = [], maxDistance = 10000 } = req.body;

  // Force sportsInterests into array
  if (!Array.isArray(sportsInterests)) {
    sportsInterests = [sportsInterests];
  }

  if (!location || !location.coordinates || location.coordinates.length !== 2) {
    return res.status(400).json({ message: "Latitude and longitude required" });
  }

  try {
    const query = {
      location: {
        $near: {
          $geometry: {
            type: location.type || "Point",
            coordinates: location.coordinates.map(Number), // [lng, lat]
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
    };

    if (sportsInterests.length > 0) {
      query.sportsInterests = {
        $elemMatch: {
          $or: sportsInterests.map(si => ({
            sport: si.sport,
            skillLevel: si.skillLevel
          }))
        }
      };
    }

    const users = await User.find(query).select("-password");

    if (users.length === 0) {
      return res.status(200).json({
        users: [],
        message: "No players found within the specified range.",
      });
    }

    res.status(200).json({
      users,
      message: "Players found successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching nearby users",
      error: error.message,
    });
  }
};

