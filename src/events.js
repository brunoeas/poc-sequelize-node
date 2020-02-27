const EventEmitter = require('events').EventEmitter;

/**
 * Classe Singleton do EventEmitter para garantir uma unica instância do EventEmitter no Runtime do App
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class EventEmitterSingleton
 */
class EventEmitterSingleton {
  constructor() {
    if (!EventEmitterSingleton.instance) {
      EventEmitterSingleton.instance = new EventEmitter();
    }
  }

  /**
   * Retorna a instância do EventEmitter
   *
   * @returns {EventEmitter} Instâcia do EventEmitter
   */
  getInstance() {
    return EventEmitterSingleton.instance;
  }
}

module.exports = EventEmitterSingleton;

/**
 * Modulos
 */
require('./event-modules');
