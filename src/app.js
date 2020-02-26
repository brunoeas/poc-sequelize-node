const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const Emitter = require('./events');
const emitter = new Emitter().getInstance();
const { eventsMap } = require('./events-map');

/**
 * Função principal que inicia os serviços
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 */
function app() {
  const app = express();
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    next();
  });
  // log errors
  app.use(function(err, req, res, next) {
    err && console.error(err);
    next(err);
  });
  // error handler
  // no stacktraces leaked to user unless in development environment
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });

  const server = http.createServer(app);

  const port = process.env.PORT || 2210;
  server.listen(port, () => console.log('> Servidor on-line na porta:', port));

  emitter.emit(eventsMap.STARTUP, app);

  return app;
}

module.exports = app();
