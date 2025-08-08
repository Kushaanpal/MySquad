import mongoose from "mongoose";
import Notification from '../models/notification.model.js';

const sendNotification = async ({ userId, message, type, matchId }) => {
  try {
    const notification = new Notification({
      user: new mongoose.Types.ObjectId(userId),
      message,
      type,
      match: new mongoose.Types.ObjectId(matchId),
    });

    await notification.save();
  } catch (error) {
    console.error("Error sending notification:", error.message);
  }
};

export default sendNotification;
