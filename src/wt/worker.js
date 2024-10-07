import { parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // Listen for data from the main thread
  parentPort.on('message', (n) => {
    try {
      const result = nthFibonacci(n);

      // Send the result back to the main thread
      parentPort.postMessage({ status: 'resolved', data: result });
    } catch (error) {
      // Send an error response if something went wrong
      parentPort.postMessage({ status: 'error', data: null });
    }
  });
};

sendResult();
