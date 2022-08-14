export default () => ({
  port: parseInt(process.env.PORT ?? '3002', 10),
  services: Object.fromEntries(
    Object.keys(process.env)
      .filter((key) => key.endsWith('_SERVICE'))
      .map((key) => [
        key.replace('_SERVICE', '').toLowerCase(),
        process.env[key],
      ]),
  ),
});
