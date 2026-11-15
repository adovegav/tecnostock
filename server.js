const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Solicitud inválida'); }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep) || !['.html','.css','.js','.svg'].includes(path.extname(file)) || pathname.startsWith('/.')) {
    res.writeHead(403); return res.end('Acceso denegado');
  }
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404); return res.end('Página no encontrada'); }
    res.writeHead(200, {'Content-Type': ({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'})[path.extname(file)]});
    res.end(data);
  });
}).listen(8080, '127.0.0.1', () => console.log('TecnoStock: http://localhost:8080'));
