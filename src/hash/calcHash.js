import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const calculateHash = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const filePath = path.join(
    currentDirectory,
    'files',
    'fileToCalculateHashFor.txt'
  );

  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create a SHA256 hash object
  const hash = crypto.createHash('sha256');

  // Pipe the file stream into the hash object
  fileStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  // When the stream ends, log the computed hash in hex format
  fileStream.on('end', () => {
    const fileHash = hash.digest('hex');
    console.log(`SHA256 hash: ${fileHash}`);
  });

  // Handle errors, for example, if the file doesn't exist
  fileStream.on('error', (err) => {
    console.error('FS operation failed', err.message);
  });
};

await calculateHash();
