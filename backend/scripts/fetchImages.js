const fs = require('fs');
const https = require('https');
const path = require('path');

const topics = {
  'ajanta_hero.jpg': 'Ajanta_Caves',
  'jataka_tales.jpg': 'Jataka_tales',
  'rock_cut.jpg': 'Indian_rock-cut_architecture',
  'buddhist_chant.jpg': 'Dhammapada',
  'ellora.jpg': 'Kailasa_Temple,_Ellora',
  'daulatabad.jpg': 'Daulatabad_Fort'
};

const downloadDir = path.join(__dirname, '..', '..', 'public', 'assets');

Object.entries(topics).forEach(([filename, title]) => {
  const options = { headers: { 'User-Agent': 'Heritage-India/1.0' } };
  https.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=1000`, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        const pages = json.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
          const imgUrl = pages[pageId].thumbnail.source;
          console.log(`Downloading ${title} from ${imgUrl}`);
          https.get(imgUrl, (imgRes) => {
            const file = fs.createWriteStream(path.join(downloadDir, filename));
            imgRes.pipe(file);
          });
        } else {
          console.log(`No image found for ${title}`);
        }
      } catch(e) { console.error(e) }
    });
  });
});
