const next = require('next');
const http = require('http');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3001;
const hostname = 'localhost';
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});