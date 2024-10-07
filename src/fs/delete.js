import fs from 'fs';
import path from 'path';

const remove = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const filePath = path.join(currentDirectory, 'files', 'fileToRemove.txt');

  try {
    // Check if the file exists
    await fs.promises.access(filePath, fs.constants.F_OK);

    // Delete the file if it exists
    await fs.promises.unlink(filePath);
    console.log('File deleted successfully');
  } catch (err) {
    // If the file does not exist or another error occurs, throw the custom error
    if (err.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error(err.message);
    }
  }
};

await remove();
