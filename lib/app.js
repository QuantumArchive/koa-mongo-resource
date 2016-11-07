const koa = require('koa');
const app = koa();
const morgan = require('morgan');
const log = morgan('dev');
const animeChars = require('./routes/animechars');
const animeShows = require('./routes/animeshows');
const errorHandler = require('./errorhandler');

app.use(log);
app.use(animeShows);
app.use(animeChars);
app.use(errorHandler);

module.exports = app;