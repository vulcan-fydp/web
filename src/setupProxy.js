const {createProxyMiddleware} = require('http-proxy-middleware');

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
      target: 'ws://localhost:8443', 
      changeOrigin: true,
      pathRewrite: path => path.replace('/relay/graphql', '')
    })
  );
};

function createAzureProxy(app) {
  app.use(
    '/backend',
    createProxyMiddleware({
      target: 'https://app.vulcangames.fun',
      changeOrigin: true,
      pathRewrite: path => path.replace('/backend', ''),
    })
  );

  const relayProxy = createProxyMiddleware('/relay', { 
    target: 'wss://app.vulcangames.fun:8443', 
    changeOrigin: true,
    pathRewrite: path => path.replace('/relay/graphql', ''),
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

if (process.env.REACT_APP_PROXY_TARGET === "local") {
  module.exports = createLocalProxy;
} else if (process.env.REACT_APP_PROXY_TARGET === "azure") {
  module.exports = createAzureProxy;
} else {
  throw new Error("Environment variable REACT_APP_PROXY_TARGET is not configured correctly");
}