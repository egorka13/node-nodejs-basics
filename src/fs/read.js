import fs from 'fs';
import path from 'path';

const read = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const filePath = path.join(currentDirectory, 'files', 'fileToRead.txt');

  try {
    // Check if the file exists
    await fs.promises.access(filePath, fs.constants.F_OK);

    // Read the file content
    const content = await fs.promises.readFile(filePath, 'utf8');

    // Print the file content to the console
    console.log(content);
  } catch (err) {
    // If the file doesn't exist or another error occurs, throw the custom error
    if (err.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error(err.message);
    }
  }
};

await read();
