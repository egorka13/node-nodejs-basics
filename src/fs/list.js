import fs from 'fs';
import path from 'path';

const list = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const folderPath = path.join(currentDirectory, 'files');

  try {
    // Check if the folder exists
    await fs.promises.access(folderPath, fs.constants.F_OK);

    // Read all filenames from the folder
    const filenames = await fs.promises.readdir(folderPath);

    // Print the filenames to the console
    console.log(filenames);
  } catch (err) {
    // If the folder doesn't exist or another error occurs, throw the custom error
    if (err.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error(err.message);
    }
  }
};

await list();
