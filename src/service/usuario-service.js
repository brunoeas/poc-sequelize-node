const EventEmitter = require('../events');
const emitter = new EventEmitter().getInstance();
const usuarioEventsMap = require('../events-map/usuario-events');

/**
 * Inicializa o Service do Usuário
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Express.Router} router - Express Router
 * @param {Function} callback - Callback para retornar o Router
 */
function initService(router, callback) {
  console.log('> Inicializando Service do Usuário');

  router.post('/usuario', (req, res) => emitter.emit(usuarioEventsMap.CREATE_USUARIO, req, res));

  router.put('/usuario', (req, res) => emitter.emit(usuarioEventsMap.UPDATE_USUARIO, req, res));

  router.get('/usuario', (req, res) => emitter.emit(usuarioEventsMap.FINDALL_USUARIOS, req, res));

  router.get('/usuario/:id', (req, res) => emitter.emit(usuarioEventsMap.FIND_USUARIO_BYID, req, res));

  router.delete('/usuario/:id', (req, res) =>
    emitter.emit(usuarioEventsMap.DELETE_USUARIO_BYID, req, res)
  );

  callback(router);
}

emitter.once(usuarioEventsMap.STARTUP, initService);
