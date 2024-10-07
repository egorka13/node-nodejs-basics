import path from 'path';
import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const currentDirectory = new URL('.', import.meta.url).pathname;
  const scriptPath = path.join(currentDirectory, 'files', 'script.js');

  // Spawn the child process with the provided arguments
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', process.stderr],
  });

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.on('error', (err) => {
    console.error('Failed to start child process:', err.message);
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
