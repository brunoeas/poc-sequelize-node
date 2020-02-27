const EventEmitter = require('../events');
const emitter = new EventEmitter().getInstance();
const enderecoEventsMap = require('../events-map/endereco-events');

/**
 * Inicializa o Service do Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Express.Router} router - Express Router
 * @param {Function} callback - Callback para retornar o Router
 */
function initService(router, callback) {
  console.log('> Inicializando Service do Endereço');

  router.post('/endereco', (req, res) => emitter.emit(enderecoEventsMap.CREATE_ENDERECO, req, res));

  router.put('/endereco', (req, res) => emitter.emit(enderecoEventsMap.UPDATE_ENDERECO, req, res));

  router.get('/endereco', (req, res) => emitter.emit(enderecoEventsMap.FINDALL_ENDERECOS, req, res));

  router.get('/endereco/residencial', (req, res) =>
    emitter.emit(enderecoEventsMap.FIND_ENDERECOS_RESIDENCIAIS, req, res)
  );

  router.get('/endereco/:id', (req, res) =>
    emitter.emit(enderecoEventsMap.FIND_ENDERECO_BYID, req, res)
  );

  router.delete('/endereco/:id', (req, res) =>
    emitter.emit(enderecoEventsMap.DELETE_ENDERECO_BYID, req, res)
  );

  router.get('/endereco/usuario/:idUsuario', (req, res) =>
    emitter.emit(enderecoEventsMap.FIND_ENDERECOS_BYUSUARIO, req, res)
  );

  callback(router);
}

emitter.once(enderecoEventsMap.STARTUP, initService);
