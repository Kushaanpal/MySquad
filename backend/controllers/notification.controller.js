import Notification from "../models/notification.model.js";

// GET /api/notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to get notifications", error });
  }
};
// POST /api/notifications/read/:id
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.isRead = true;
    await notification.save();
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark as read", error });
  }
};
