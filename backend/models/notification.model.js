import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['match_created', 'match_joined', 'match_left'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
