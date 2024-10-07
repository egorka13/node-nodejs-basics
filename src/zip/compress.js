import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const compress = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const filePath = path.join(currentDirectory, 'files', 'fileToCompress.txt');
  const compressedFilePath = path.join(currentDirectory, 'files', 'archive.gz');

  // Create a readable stream from the file to be compressed
  const fileStream = fs.createReadStream(filePath);

  // Create a writable stream for the compressed file
  const outputStream = fs.createWriteStream(compressedFilePath);

  // Create a Gzip transform stream to compress the file
  const gzipStream = zlib.createGzip();

  // Pipe the file stream through the gzip stream and then into the output stream
  fileStream.pipe(gzipStream).pipe(outputStream);

  // Handle any errors during the process
  fileStream.on('error', (err) => {
    console.error('Error reading file:', err.message);
  });

  outputStream.on('error', (err) => {
    console.error('Error writing compressed file:', err.message);
  });

  outputStream.on('finish', () => {
    console.log('File successfully compressed to archive.gz');
  });
};

await compress();
