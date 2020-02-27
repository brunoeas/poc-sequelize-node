const EventEmitter = require('../events');
const emitter = new EventEmitter().getInstance();
const { eventsMap } = require('../events-map');

/**
 * Trata um erro loggando ele e retornando na Response o status 400 e a mensagem de erro
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Response} res - Response
 * @param {*} err - Erro
 * @param {string} [msg='> Ocorreu um erro: '] - Mensagem de erro
 */
function handleErrorAndSendResponse(res, err, msg = '> Ocorreu um erro') {
  console.error(`\n${msg}: `, err);
  res.status(400).send({
    message: msg,
    error: process.env.RUNNING_ENV && process.env.RUNNING_ENV !== 'dev' ? undefined : err
  });
}

emitter.on(eventsMap.HANDLE_ERROR, handleErrorAndSendResponse);
