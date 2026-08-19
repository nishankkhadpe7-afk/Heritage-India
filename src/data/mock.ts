export type Place={name:string; location:string; distance:string; category:string; duration:string; image:string};
export const places:Place[]=[
  {name:'Saraswathi Mahal Library',location:'Thanjavur',distance:'1.2 km',category:'Knowledge Heritage',duration:'40 min',image:'/saraswathi_library.png'},
  {name:'Traditional Craft Centre',location:'Thanjavur',distance:'2.4 km',category:'Craft Heritage',duration:'45 min',image:'/craft_centre.jpg'},
  {name:'Schwartz Church',location:'Thanjavur',distance:'1.8 km',category:'Historic Architecture',duration:'30 min',image:'/schwartz_church.png'}];
export const living=[['Local Songs','Voices and melodies carried across generations.','songs'],['Traditional Crafts','Skills, materials and techniques rooted in place.','craft'],['Forgotten Recipes','Food traditions that tell stories of communities.','food'],['Folk Stories','Memory, performance and oral history.','stories']];
export const experiences=['Music','Stories','Crafts','Food','Festivals','Garments','Agriculture','Rituals','Occupations'];
export const zones=[{name:'Main Monument',occupancy:86,vulnerability:90,status:'Critical'},{name:'Museum',occupancy:42,vulnerability:60,status:'Normal'},{name:'Courtyard',occupancy:64,vulnerability:54,status:'Warning'},{name:'Garden',occupancy:25,vulnerability:35,status:'Normal'}];
