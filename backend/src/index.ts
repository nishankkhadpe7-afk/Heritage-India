import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Site, Experience, Place, Zone } from './models';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heritage-india';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// 1. Get all sites (for the future landing page)
app.get('/api/sites', async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
});

// 2. Get a single site by ID
app.get('/api/sites/:id', async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ error: 'Site not found' });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch site' });
  }
});

// 3. Get experiences for a specific site
app.get('/api/sites/:id/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find({ siteId: req.params.id });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// 4. Get nearby places for a specific site
app.get('/api/sites/:id/places', async (req, res) => {
  try {
    const places = await Place.find({ siteId: req.params.id });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// 5. Get zones for a specific site (for the Dashboard prototype)
app.get('/api/sites/:id/zones', async (req, res) => {
  try {
    const zones = await Zone.find({ siteId: req.params.id });
    res.json(zones);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch zones' });
  }
});

// 6. SSE Simulation Stream
app.get('/api/simulation/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish SSE connection

  let baseVisitors = 600; // Starting baseline

  const interval = setInterval(() => {
    // Generate some random fluctuation to simulate a live crowd
    const fluctuation = Math.floor(Math.random() * 100) - 40; // -40 to +60
    baseVisitors = Math.max(100, Math.min(2500, baseVisitors + fluctuation));
    
    // Simulate zones based on the global visitor count
    const simulatedZones = [
      { name: 'Main Monument', occupancy: Math.min(100, Math.max(10, Math.floor((baseVisitors / 1500) * 110))) },
      { name: 'Museum', occupancy: Math.min(100, Math.max(10, Math.floor((baseVisitors / 1500) * 65))) },
      { name: 'Courtyard', occupancy: Math.min(100, Math.max(10, Math.floor((baseVisitors / 1500) * 85))) },
      { name: 'Garden', occupancy: Math.min(100, Math.max(10, Math.floor((baseVisitors / 1500) * 40))) }
    ].map(z => ({
      ...z,
      status: z.occupancy > 80 ? 'Critical' : z.occupancy > 60 ? 'Warning' : 'Normal'
    }));

    // Send the simulated data packet
    res.write(`data: ${JSON.stringify({
      visitors: baseVisitors,
      siteOccupancy: Math.min(100, Math.floor((baseVisitors / 2000) * 100)),
      zones: simulatedZones
    })}\n\n`);
  }, 2000); // Push data every 2 seconds

  // Clean up on client disconnect
  req.on('close', () => clearInterval(interval));
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
