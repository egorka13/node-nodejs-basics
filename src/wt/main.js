import { Worker } from 'worker_threads';
import { cpus } from 'os';

const numCores = cpus().length;

const createWorker = (n) => {
  return new Promise((resolve) => {
    const worker = new Worker(new URL('./worker.js', import.meta.url));

    // Send the value `n` to the worker
    worker.postMessage(n);

    // Listen for messages from the worker
    worker.on('message', (message) => {
      resolve(message);
    });

    // Handle errors in worker
    worker.on('error', () => {
      resolve({ status: 'error', data: null });
    });

    // Handle worker exit
    worker.on('exit', (code) => {
      if (code !== 0) {
        resolve({ status: 'error', data: null });
      }
    });
  });
};

const performCalculations = async () => {
  const promises = [];

  // Send incremental Fibonacci values starting from 10 to each worker
  for (let i = 0; i < numCores; i++) {
    promises.push(createWorker(10 + i));
  }

  const results = await Promise.all(promises);

  console.log(results);
};

await performCalculations();
