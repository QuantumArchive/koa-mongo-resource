const http = require('http');
const port = process.env.PORT || 8764;
const app = require('./lib/app');
require('./lib/mongoose-setup');

const server = http.createServer(app.callback());
server.listen(port, () => {
    console.log('server currently connected to port', port);
});