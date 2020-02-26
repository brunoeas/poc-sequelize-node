const Emitter = require('../events');
const emitter = new Emitter().getInstance();
const usuarioEventsMap = require('../events-map/usuario-events');

/**
 * Inicializa o Service do Usuário
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {*} app - Express
 */
function initService(app) {
  console.log('> Inicializando Service do Usuário');

  app.post('/usuario', (req, res) => emitter.emit(usuarioEventsMap.CREATE_USUARIO, req, res));

  app.put('/usuario', (req, res) => emitter.emit(usuarioEventsMap.UPDATE_USUARIO, req, res));

  app.get('/usuario', (req, res) => emitter.emit(usuarioEventsMap.FINDALL_USUARIOS, req, res));

  app.get('/usuario/:id', (req, res) => emitter.emit(usuarioEventsMap.FIND_USUARIO_BYID, req, res));

  app.delete('/usuario/:id', (req, res) => emitter.emit(usuarioEventsMap.DELETE_USUARIO_BYID, req, res));
}

emitter.once(usuarioEventsMap.STARTUP, initService);
