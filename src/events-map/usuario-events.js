const { getEventsMap } = require('./index');

/**
 * Mapa de eventos que são emitidos para comunicação no fluxo do Usuário
 */
const usuarioEventsMap = {
  CREATE_USUARIO: 'CREATE_USUARIO',
  UPDATE_USUARIO: 'UPDATE_USUARIO',
  FINDALL_USUARIOS: 'FINDALL_USUARIOS',
  FIND_USUARIO_BYID: 'FIND_USUARIO_BYID',
  DELETE_USUARIO_BYID: 'DELETE_USUARIO_BYID'
};

module.exports = getEventsMap(usuarioEventsMap);
