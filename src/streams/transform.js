import { Transform } from 'stream';

const reverseTextStream = new Transform({
  transform(chunk, encoding, callback) {
    // Convert the chunk (buffer) to string, reverse it, and push it to the output
    const reversedChunk = chunk.toString().split('').reverse().join('');
    this.push(reversedChunk);
    callback();
  },
});

const transform = async () => {
  // Pipe the input from stdin, reverse it using the Transform stream, and output it to stdout
  process.stdin.pipe(reverseTextStream).pipe(process.stdout);
};

await transform();
