import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import NodeCache from 'node-cache';

const cacheService = new NodeCache({ stdTTL: 120, checkperiod: 120 });

const preReqCacheCheck = (req, res, next) => {
  if (req.originalUrl === '/products' && req.method === 'GET' && req.body === '') {
    const cacheValue = cacheService.get('getProductsList');
    if (cacheValue) {
      console.log('RESPONSE FROM CACHE');
      res.setHeader('content-type', 'application/json');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET');
      return res.status(200).end(cacheValue);
    }
  }
  next();
};

const onProxyRes = async (responseBuffer, proxyRes, req, res) => {
  const response = responseBuffer.toString('utf8');
  if (req.originalUrl === '/products' && req.method === 'GET' && req.body === '') {
    const cacheValue = cacheService.get('getProductsList');
    if (!cacheValue) {
      cacheService.set('getProductsList', response);
    }
  }
  return response;
};

export const setupProxies = (app, services) => {
  services.forEach(([serviceName, serviceUrl]) => {
    app.use(
      `/${serviceName}`,
      preReqCacheCheck,
      createProxyMiddleware({
        target: serviceUrl,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes: responseInterceptor(onProxyRes),
      })
    );
  });
};
