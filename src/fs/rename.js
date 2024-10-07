import fs from 'fs';
import path from 'path';

const rename = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const oldFilePath = path.join(currentDirectory, 'files', 'wrongFilename.txt');
  const newFilePath = path.join(currentDirectory, 'files', 'properFilename.md');

  try {
    // Check if wrongFilename.txt exists
    await fs.promises.access(oldFilePath, fs.constants.F_OK);

    // Check if properFilename.md already exists
    try {
      await fs.promises.access(newFilePath, fs.constants.F_OK);
      // If the above line doesn't throw, properFilename.md already exists, throw an error
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    // Rename the file from wrongFilename.txt to properFilename.md
    await fs.promises.rename(oldFilePath, newFilePath);
    console.log('File renamed successfully');
  } catch (err) {
    console.error(err.message);
  }
};

await rename();
