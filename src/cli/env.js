const parseEnv = () => {
  const rssEnvVars = Object.entries(process.env)
    .filter(([key, value]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`);

  console.log(rssEnvVars.join('; '));
};

parseEnv();
