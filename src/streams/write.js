import fs from 'fs';
import path from 'path';

const write = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const filePath = path.join(currentDirectory, 'files', 'fileToWrite.txt');

  // Create a writable stream for the file
  const fileStream = fs.createWriteStream(filePath);

  // Pipe the stdin (user input) to the file stream
  process.stdin.pipe(fileStream);

  // Log a message when the writing is finished
  fileStream.on('finish', () => {
    console.log('Input has been written to fileToWrite.txt');
  });

  // Handle errors, if any occur during the writing process
  fileStream.on('error', (err) => {
    console.error('FS operation failed', err.message);
  });
};

await write();
