import mongoose, { Schema, model, models } from 'mongoose';

const LinkSchema = new Schema({
  token: { type: String, required: true, unique: true },
  destinationUrl: { type: String, required: true },
  visits: { type: Number, default: 0 },
  history: [{
    oldUrl: String,
    changedAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

const Link = models.Link || model('Link', LinkSchema);
export default Link;
