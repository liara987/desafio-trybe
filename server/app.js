const http = require('http');
const api = require('./api');
const server = http.createServer(api);

server.listen(3001);