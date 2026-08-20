import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  heroImage: { type: String },
  location: { type: String, required: true },
});

const ExperienceSchema = new mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  copy: { type: String, required: true },
  img: { type: String },
});

const PlaceSchema = new mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  distance: { type: String },
  category: { type: String },
  duration: { type: String },
  image: { type: String },
});

const ZoneSchema = new mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  name: { type: String, required: true },
  occupancy: { type: Number, default: 0 },
  vulnerability: { type: Number, default: 50 },
  status: { type: String, enum: ['Normal', 'Warning', 'Critical'], default: 'Normal' },
});

export const Site = mongoose.model('Site', SiteSchema);
export const Experience = mongoose.model('Experience', ExperienceSchema);
export const Place = mongoose.model('Place', PlaceSchema);
export const Zone = mongoose.model('Zone', ZoneSchema);
