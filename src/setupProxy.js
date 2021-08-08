const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/backend',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: path => path.replace('/backend', '')
    })
  );

  app.use(
    '/relay',
    createProxyMiddleware({ 
      target: 'http://localhost:8443', 
      changeOrigin: true,
      pathRewrite: path => path.replace('/relay', '')
    })
  );
};