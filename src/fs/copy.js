import fs from 'fs';
import path from 'path';

const copy = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const sourceFolder = path.join(currentDirectory, 'files');
  const destinationFolder = path.join(currentDirectory, 'files_copy');

  try {
    // Check if the source folder exists
    await fs.promises.access(sourceFolder, fs.constants.F_OK);

    // Check if the destination folder already exists
    try {
      await fs.promises.access(destinationFolder, fs.constants.F_OK);
      // If the above line doesn't throw, it means the folder exists, throw an error
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    // Recursively copy the source folder to the destination folder
    await copyDirectory(sourceFolder, destinationFolder);

    console.log('Folder copied successfully');
  } catch (err) {
    console.error(err.message);
  }
};

const copyDirectory = async (source, destination) => {
  await fs.promises.mkdir(destination, { recursive: true });

  const entries = await fs.promises.readdir(source, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
};

await copy();
