/**
 * Modulos que de alguma forma manipulam eventos, tanto emitindo algum evento quanto recebendo eventos.
 * Em resumo todos os arquivos e utilizarem o EventEmitter devem ser "importados" aqui
 */
const modules = [
  require('./service/usuario-service'),
  require('./controller/usuario-controller'),
  require('./util/util'),
  require('./controller/endereco-controller'),
  require('./service/endereco-service')
];

module.exports = modules;
