import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    sport: { type: String, required: true },
    date: { type: Date, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    image: { type: String }, // URL or file path of uploaded image
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

matchSchema.index({ location: '2dsphere' });

const Match = mongoose.model('Match', matchSchema);
export default Match;
