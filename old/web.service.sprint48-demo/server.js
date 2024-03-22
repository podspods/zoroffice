const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const settings = require('./lib/settings');
const nconf = require('nconf');
const whiteListURL = require('./config/whiteListURL.json');

settings.loadConfig();

const dev = nconf.get('StaticServer:env').toLowerCase() === 'dev';
const app = next({
  dev
});
const handle = app.getRequestHandler();


const httpsOptions = {
  key: fs.readFileSync(nconf.get('StaticServer:https:privateKey')),
  cert: fs.readFileSync(nconf.get('StaticServer:https:certificate')),
  requestTimeout: 0
};

app.prepare().then(() => {
  const proxyURL = nconf.get('StaticServer:Proxy:consoleUrl');
  const strictSSL = nconf.get('StaticServer:Proxy:strictSSL');
  const proxyApi = createProxyMiddleware('/node', {
    target: proxyURL, // Destination URL here (ses-console URL)
    pathRewrite: {
      '^/node': '/'
    },
    secure: strictSSL

  });

  const proxyFront = createProxyMiddleware({
    target: proxyURL, // Destination URL here (ses-console URL)
    secure: strictSSL
  });

  const frontendUrl = nconf.get('StaticServer:Frontend:publicUrl');
  const frontendPort = nconf.get('StaticServer:Frontend:port');
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    const origin = req.headers.referer || '';
    // set default Content-Security-Policy to secure the Frontend service
    res.setHeader('Content-Security-Policy', `frame-src ${frontendUrl}; frame-ancestors ${frontendUrl}`);
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // TODO: remove after migrating iframes
    // white list for right-click open in Chrome
    const isWhiteListedURL =
      whiteListURL.whiteList.some((URL) => parsedUrl.path.includes(URL)) ||
      origin.startsWith(frontendUrl + '/signin?')
    ;

    const isFrontProxy =
      (
        parsedUrl.path.startsWith('/views') ||
        parsedUrl.path.startsWith('/admin/') ||
        parsedUrl.path.startsWith('/resources/') ||
        (
          origin.startsWith(frontendUrl + '/views') ||
          origin.startsWith(frontendUrl + '/oidc') ||
          origin.startsWith(frontendUrl + '/auth/') ||
          origin.includes('font-awesome.min.css') ||
          origin.includes('stylesheets/style.css') ||
          origin.includes('bootstrap') ||
          parsedUrl.path.includes('/auth/') ||
          parsedUrl.path.includes('/oidc') ||
          parsedUrl.path.includes('/signout') ||
          parsedUrl.path.includes('/signin')
        ) &&
        !isWhiteListedURL
      );

    if (parsedUrl.path.startsWith('/node')) {
      console.log('proxy API', parsedUrl.path, res.statusCode, origin);
      proxyApi(req, res);
    }
    else if (isFrontProxy) {
      console.log('proxy front', parsedUrl.path, res.statusCode, origin);
      proxyFront(req, res);
    }
    else {
      console.log('static', parsedUrl.path, res.statusCode, origin);
      handle(req, res, parsedUrl);
    }
  }).listen(frontendPort, (err) => {
    if (err) throw err;
    console.log('> Server started on ' + frontendPort);
  });
}).catch((err) => {
  console.log('Error:::::', err);
});
