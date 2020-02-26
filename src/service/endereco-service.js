const Emitter = require('../events');
const emitter = new Emitter().getInstance();
const enderecoEventsMap = require('../events-map/endereco-events');

/**
 * Inicializa o Service do Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {*} app - Express
 */
function initService(app) {
  console.log('> Inicializando Service do Endereço');

  app.post('/endereco', (req, res) => emitter.emit(enderecoEventsMap.CREATE_ENDERECO, req, res));

  app.put('/endereco', (req, res) => emitter.emit(enderecoEventsMap.UPDATE_ENDERECO, req, res));

  app.get('/endereco', (req, res) => emitter.emit(enderecoEventsMap.FINDALL_ENDERECOS, req, res));

  app.get('/endereco/:id', (req, res) => emitter.emit(enderecoEventsMap.FIND_ENDERECO_BYID, req, res));

  app.delete('/endereco/:id', (req, res) =>
    emitter.emit(enderecoEventsMap.DELETE_ENDERECO_BYID, req, res)
  );
}

emitter.once(enderecoEventsMap.STARTUP, initService);
