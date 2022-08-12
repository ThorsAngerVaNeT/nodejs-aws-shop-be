import { createProxyMiddleware } from 'http-proxy-middleware';

export const setupProxies = (app, services) => {
  services.forEach(([serviceName, serviceUrl]) => {
    app.use(`/${serviceName}`, createProxyMiddleware({ target: serviceUrl, changeOrigin: true }));
  });
};
