import Match from '../models/match.model.js';
import mongoose from 'mongoose';

// POST /api/matches/create - Create a new match (Protected)
export const createMatch = async (req, res) => {
  try {
    // If req.body is undefined (e.g. invalid form-data), return early
    if (!req.body) {
      return res.status(400).json({ message: "Form data is missing." });
    }

    const { title, sport, date, latitude, longitude, description } = req.body;

    // Check required fields
    if (!title || !sport || !date || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Create new match document
    const match = new Match({
      title,
      sport,
      description,
      date,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      image: req.file?.path || null,
      creator: req.user._id, // from authenticateUser middleware
    });

    // Save match to DB
    await match.save();

    res.status(201).json({
      message: "Match created successfully",
      match,
    });
  } catch (error) {
    console.error("Match creation error:", error);
    res.status(500).json({ message: "Server error while creating match." });
  }
};


// GET /api/matches - Get all public matches
export const getAllMatches = async (req, res) => {
  try {
   const matches = await Match.find().populate('participants').populate('creator', 'name email');
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching matches', error: error.message });
  }
};

// GET /api/matches/:id - Get match by ID
export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('creator', 'username')
      .populate('participants', 'username');

    if (!match) return res.status(404).json({ message: 'Match not found' });

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching match', error: error.message });
  }
};

// PUT /api/matches/:id - Update match (creator only)
export const updateMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ message: 'Match not found' });
    if (!match.creator.equals(req.user._id))
      return res.status(403).json({ message: 'Only creator can update match' });

    Object.assign(match, req.body);
    await match.save();

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error updating match', error: error.message });
  }
};

// DELETE /api/matches/:id - Delete match (creator only)
export const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ message: 'Match not found' });
    if (!match.creator.equals(req.user._id))
      return res.status(403).json({ message: 'Only creator can delete match' });

    await match.deleteOne();
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting match', error: error.message });
  }
};

// POST /api/matches/:id/join - Join a match (Protected)
export const joinMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ message: 'Match not found' });

    if (!Array.isArray(match.participants)) match.participants = [];

    if (match.participants.includes(req.user._id))
      return res.status(400).json({ message: 'Already joined this match' });

    if (match.participants.length >= match.maxPlayers)
      return res.status(400).json({ message: 'Match is full' });

    match.participants.push(req.user._id);
    await match.save();

    res.status(200).json({ message: 'Joined match successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining match', error: error.message });
  }
};

// POST /api/matches/:id/leave - Leave a match (Protected)
export const leaveMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ message: 'Match not found' });

    match.participants = match.participants.filter((id) => id.toString() !== req.user._id.toString());
    await match.save();

    res.status(200).json({ message: 'Left match successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error leaving match', error: error.message });
  }
};
