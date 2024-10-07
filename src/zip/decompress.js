import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const decompress = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const compressedFilePath = path.join(currentDirectory, 'files', 'archive.gz');
  const decompressedFilePath = path.join(
    currentDirectory,
    'files',
    'fileToCompress.txt'
  );

  // Create a readable stream from the compressed file
  const compressedFileStream = fs.createReadStream(compressedFilePath);

  // Create a writable stream for the decompressed file
  const outputFileStream = fs.createWriteStream(decompressedFilePath);

  // Create a Gzip decompression stream
  const gunzipStream = zlib.createGunzip();

  // Pipe the compressed file through the Gunzip stream and write it to the output file
  compressedFileStream.pipe(gunzipStream).pipe(outputFileStream);

  // Handle errors during the process
  compressedFileStream.on('error', (err) => {
    console.error('Error reading compressed file:', err.message);
  });

  outputFileStream.on('error', (err) => {
    console.error('Error writing decompressed file:', err.message);
  });

  outputFileStream.on('finish', () => {
    console.log('File successfully decompressed to fileToCompress.txt');
  });
};

await decompress();
