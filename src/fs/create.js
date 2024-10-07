import fs from 'fs';
import path from 'path';

const create = async () => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const filePath = path.join(currentDirectory, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try {
    // Check if the file already exists
    await fs.promises.access(filePath, fs.constants.F_OK);

    // If the above line does not throw an error, the file exists, so we throw an error
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If file does not exist, create the file and write content
      await fs.promises.writeFile(filePath, content);
      console.log('File created successfully');
    } else {
      // If it's any other error (file exists), throw the error
      throw err;
    }
  }
};

await create();
