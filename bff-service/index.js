import express from 'express';
import { ERROR_RESPONSE_502 } from './constants.js';
import { PORT, SERVICES } from './config.js';
import { setupProxies } from './proxy.js';

const app = express();

app.use(express.json());

setupProxies(app, Object.entries(SERVICES));

app.all('/*', (req, res) => {
  const [, serviceName] = req.originalUrl.split('/');
  const serviceUrl = SERVICES[serviceName];

  if (!serviceUrl) {
    res.status(502).json(ERROR_RESPONSE_502);
  }
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
