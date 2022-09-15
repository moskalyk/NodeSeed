
const express = require('express');
const log = require('./utils/logger.js');

const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

// EXPRESS CONFIGS ===================================
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser()); 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.use((req, res, next) => {
  log.info({ req, module: 'api' }, `New request`);
  next();
});

// APPLY ROUTES
const indexRouter = require('./routes/index');
app.use('/index', indexRouter);

app.listen(PORT, () => {
  log.info({ module: 'api' }, `${app.name} listening on port:${PORT}`);
});

// Used for testing
module.exports = app;
