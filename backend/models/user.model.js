import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: function () { return !this.googleId; }, // only required if not Google user
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
      required: function () { return !this.googleId; }, // only required if not Google user
      minlength: 6,
    },
    googleId: {  // new field for Google login
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    sportsInterests: [
      {
        sport: { type: String, required: true, trim: true },
        skillLevel: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced'],
          required: true
        }
      }
    ],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        default: [0, 0],
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

export default User;
