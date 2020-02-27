/**
 * Mapa dos eventos padrões que são emitidos para comunicação entre os fluxos
 */
const defaultEventsMap = {
  STARTUP: 'STARTUP',
  HANDLE_ERROR: 'HANDLE_ERROR'
};

/**
 * Mescla os eventos passados por parâmetro e os padrões e retorna
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Object} [additional={}] - Eventos adicionais que serão mesclados, dando preferência aos eventos padrões
 * @returns {Object} Eventos padrões e do parâmetro mesclados
 */
function getEventsMap(additional = {}) {
  return { ...additional, ...defaultEventsMap };
}

module.exports = { getEventsMap, eventsMap: defaultEventsMap };
