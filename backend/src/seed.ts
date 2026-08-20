import mongoose from 'mongoose';
import { Site, Experience, Place, Zone } from './models';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heritage-india';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Site.deleteMany({});
    await Experience.deleteMany({});
    await Place.deleteMany({});
    await Zone.deleteMany({});

    // Create Main Site (Thanjavur)
    const mainSite = await Site.create({
      name: 'Brihadisvara Temple',
      description: 'A Hindu temple dedicated to Shiva located in South bank of Cauvery river in Thanjavur, Tamil Nadu.',
      location: 'Thanjavur, Tamil Nadu',
      heroImage: '/assets/temple-hero.png'
    });

    const siteId = mainSite._id;

    // Create Second Site (Ajanta Caves) for Hackathon Demo
    const secondSite = await Site.create({
      name: 'Ajanta Caves',
      description: 'Ancient Buddhist cave monuments featuring exquisite paintings and rock-cut sculptures.',
      location: 'Chhatrapati Sambhajinagar, Maharashtra',
      heroImage: '/assets/ajanta_hero.jpg'
    });
    
    const ajantaId = secondSite._id;

    // Create Experiences
    await Experience.create([
      { siteId, category: 'Music', title: 'The sound of the veena', copy: 'Explore a carefully considered digital experience.', img: '/assets/thesoundofwaves.png' },
      { siteId, category: 'Stories', title: 'Stories rooted in place', copy: 'Discover memory, performance, and oral history.', img: '/assets/storiesrooted.png' },
      { siteId, category: 'Crafts', title: 'Traditional crafts', copy: 'Skills, materials, and techniques.', img: '/assets/traditionalcrafts.png' },
      { siteId, category: 'Food', title: 'Forgotten recipes', copy: 'Food traditions that tell stories.', img: '/assets/forgottenrecipe.png' },
      { siteId, category: 'Festivals', title: 'Festivals and celebrations', copy: 'Experience vibrant traditions.', img: '/assets/folkstories.png' },
      { siteId, category: 'Garments', title: 'Traditional garments', copy: 'Explore the textile heritage.', img: '/assets/garments_heritage.jpg' },
      { siteId, category: 'Agriculture', title: 'Agricultural practices', copy: 'Deep connection between land and people.', img: '/assets/agriculture_heritage.jpg' },
      { siteId, category: 'Rituals', title: 'Sacred rituals', copy: 'Witness spiritual practices.', img: '/assets/rituals_heritage.jpg' },
      { siteId, category: 'Occupations', title: 'Historic occupations', copy: 'Learn about traditional livelihoods.', img: '/assets/occupations_heritage.jpg' },
      
      // Ajanta Caves
      { siteId: ajantaId, category: 'Stories', title: 'Jataka Tales', copy: 'Stories of previous lives of the Buddha painted on cave walls.', img: '/assets/jataka_tales.jpg' },
      { siteId: ajantaId, category: 'Crafts', title: 'Rock-cut Architecture', copy: 'Mastery of ancient Indian rock-cut carving.', img: '/assets/rock_cut.jpg' },
      { siteId: ajantaId, category: 'Rituals', title: 'Buddhist Chants', copy: 'The acoustics of the Chaitya halls designed for chanting.', img: '/assets/buddhist_chant.jpg' }
    ]);

    // Create Nearby Places
    await Place.create([
      // Brihadisvara
      { siteId, name: 'Saraswathi Mahal Library', location: 'Thanjavur', distance: '1.2 km', category: 'Knowledge Heritage', duration: '40 min', image: '/assets/nearbydiscovery.png' },
      { siteId, name: 'Traditional Craft Centre', location: 'Thanjavur', distance: '2.4 km', category: 'Craft Heritage', duration: '45 min', image: '/assets/traditionalcrafts.png' },
      { siteId, name: 'Schwartz Church', location: 'Thanjavur', distance: '1.8 km', category: 'Historic Architecture', duration: '30 min', image: '/assets/temple-hero.png' },
      
      // Ajanta Caves
      { siteId: ajantaId, name: 'Ellora Caves', location: 'Maharashtra', distance: '100 km', category: 'Historic Architecture', duration: '3 hrs', image: '/assets/ellora.jpg' },
      { siteId: ajantaId, name: 'Daulatabad Fort', location: 'Maharashtra', distance: '85 km', category: 'Historic Architecture', duration: '2 hrs', image: '/assets/daulatabad.jpg' }
    ]);

    // Create Zones
    await Zone.create([
      // Brihadisvara
      { siteId, name: 'Main Monument', occupancy: 86, vulnerability: 90, status: 'Critical' },
      { siteId, name: 'Museum', occupancy: 42, vulnerability: 60, status: 'Normal' },
      { siteId, name: 'Courtyard', occupancy: 64, vulnerability: 54, status: 'Warning' },
      { siteId, name: 'Garden', occupancy: 25, vulnerability: 35, status: 'Normal' },
      
      // Ajanta Caves
      { siteId: ajantaId, name: 'Cave 1 (Main Shrine)', occupancy: 95, vulnerability: 98, status: 'Critical' },
      { siteId: ajantaId, name: 'Cave 26 (Chaitya)', occupancy: 70, vulnerability: 80, status: 'Warning' },
      { siteId: ajantaId, name: 'Viewpoint', occupancy: 30, vulnerability: 10, status: 'Normal' }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
