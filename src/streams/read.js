import fs from 'fs';
import path from 'path';

const read = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const filePath = path.join(currentDirectory, 'files', 'fileToRead.txt');

  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath, 'utf8');

  fileStream.pipe(process.stdout);

  // Handle errors, such as if the file does not exist
  fileStream.on('error', (err) => {
    console.error('FS operation failed', err.message);
  });
};

await read();
