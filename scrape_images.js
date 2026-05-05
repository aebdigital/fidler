const fs = require('fs');
const http = require('http');
const path = require('path');

const htmlDir = path.join(__dirname, 'src', 'data', 'scraped');
const imgDir = path.join(__dirname, 'public', 'scraped');

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
const imageUrls = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(htmlDir, file), 'utf8');
  const imgRegex = /src="([^"]+\.(jpg|gif|png|bmp))"/gi;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    imageUrls.add(match[1]);
  }
  const hrefRegex = /href="([^"]+\.jpg)"/gi;
  while ((match = hrefRegex.exec(content)) !== null) {
    imageUrls.add(match[1]);
  }
});

console.log(`Found ${imageUrls.size} images to download.`);

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    http.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function downloadAll() {
  for (const img of imageUrls) {
    console.log(`Downloading ${img}...`);
    try {
      await download(`http://www.klampiarfidler.sk/${img}`, path.join(imgDir, img));
    } catch (e) {
      console.error(`Failed ${img}:`, e.message);
    }
  }
  console.log('Done downloading images.');
}

downloadAll();
