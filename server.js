const http = require('http');
const port = process.env.PORT || 3000;
const app = require('./lib/app');
require('./lib/mongoose-setup');

const server = http.createServer(app);
server.listen(port, () => {
    console.log('server currently connected to port', port);
});