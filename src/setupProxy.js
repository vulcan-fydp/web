const createProxyMiddleware = require('http-proxy-middleware');

function createLocalProxy(app) {
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
      target: 'wss://vulcangames.fun:8443', 
      changeOrigin: true,
      pathRewrite: path => path.replace('/relay/graphql', '')
    })
  );
};

function createAzureProxy(app) {
  app.use(
    '/backend',
    createProxyMiddleware({
      target: 'https://vulcangames.fun',
      changeOrigin: true,
      pathRewrite: path => path.replace('/backend', '')
    })
  );

  const relayProxy = createProxyMiddleware('/relay', { 
    target: 'wss://vulcangames.fun:8443', 
    changeOrigin: true,
    pathRewrite: path => {console.log(path);return path.replace('/relay/graphql', '')},
    ws: true,
    logLevel: "debug"
  })

  app.use(
    relayProxy
  );

  app.listen = (...args) => {
    const server = app.listen(...args);
    server.on('upgrade', relayProxy);
    return server;
  }
};

module.exports = createLocalProxy;