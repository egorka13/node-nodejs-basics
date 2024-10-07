const parseArgs = () => {
  const args = process.argv.slice(2); // Skip the first two default arguments

  const result = [];

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].replace(/^--/, ''); // Remove the -- prefix
    const propValue = args[i + 1]; // The value follows the propName

    result.push(`${propName} is ${propValue}`);
  }

  console.log(result.join(', '));
};

parseArgs();
