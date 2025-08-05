import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: '', // optional profile picture URL
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    sportsInterests: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

const User = mongoose.model('User', userSchema);

export default User;
