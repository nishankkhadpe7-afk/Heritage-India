import { places, zones, experiences } from '../data/mock';
// Replace these mock boundaries with FastAPI REST calls when the API is available.
export const getZones=async()=>zones;
export const getNearbyPlaces=async()=>places;
export const getHeritageItems=async()=>experiences;
export const getRecommendedRoute=async()=>['Entrance','Museum','Garden','Main Monument'];
