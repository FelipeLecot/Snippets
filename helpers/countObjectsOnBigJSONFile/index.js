import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { parser } = require('stream-json');
const StreamArray = require('stream-json/streamers/StreamArray');

const fileStream = fs.createReadStream('articles.json');
const jsonStream = fileStream.pipe(parser()).pipe(StreamArray.streamArray());

let count = 0;

jsonStream.on('data', ({ value }) => {
  count++;
});

jsonStream.on('end', () => {
  console.log(`Total number of objects: ${count}`);
});

jsonStream.on('error', (err) => {
  console.error('Error processing the JSON file:', err);
});
