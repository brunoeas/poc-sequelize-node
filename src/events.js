const EventEmitter = require('events').EventEmitter;

/**
 * Classe Singleton do EventEmitter para garantir uma unica instância do EventEmitter no Runtime do App
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class Singleton
 */
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new EventEmitter();
    }
  }

  /**
   * Retorna a instância do EventEmitter
   *
   * @returns {EventEmitter} Instâcia do EventEmitter
   */
  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;

/**
 * Modulos
 */
require('./event-modules');
