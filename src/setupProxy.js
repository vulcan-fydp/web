const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/backend',
    createProxyMiddleware({
      target: 'https://vulcangames.fun',
      changeOrigin: true,
      pathRewrite: path => path.replace('/backend', '')
    })
  );

  app.use(
    '/relay',
    createProxyMiddleware({ 
      target: 'wss://vulcangames.fun:8443', 
      changeOrigin: true,
      pathRewrite: path => path.replace('/relay/graphql', '')
    })
  );
};