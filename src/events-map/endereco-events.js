const { getEventsMap } = require('./index');

/**
 * Mapa de eventos que são emitidos para comunicação no fluxo do Endereço
 */
const enderecoEventsMap = {
  CREATE_ENDERECO: 'CREATE_ENDERECO',
  UPDATE_ENDERECO: 'UPDATE_ENDERECO',
  FINDALL_ENDERECOS: 'FINDALL_ENDERECOS',
  FIND_ENDERECO_BYID: 'FIND_ENDERECO_BYID',
  FIND_ENDERECOS_BYUSUARIO: 'FIND_ENDERECOS_BYUSUARIO',
  FIND_ENDERECOS_RESIDENCIAIS: 'FIND_ENDERECOS_RESIDENCIAIS',
  DELETE_ENDERECO_BYID: 'DELETE_ENDERECO_BYID'
};

module.exports = getEventsMap(enderecoEventsMap);
