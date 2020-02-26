const Emitter = require('../events');
const emitter = new Emitter().getInstance();
const enderecoEventsMap = require('../events-map/endereco-events');
const models = require('../../models');
const Endereco = models.endereco;
const Usuario = models.usuario;
const { EnderecoModel } = require('../../models/endereco');

/**
 * Salva um novo Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function saveEndereco(req, res) {
  setUsuarioInEndereco(req.body)
    .then(() =>
      Endereco.create(new EnderecoModel(req.body, true))
        .then(data => res.send(data))
        .catch(err =>
          emitter.emit(enderecoEventsMap.HANDLE_ERROR, res, err, '> Erro ao salvar novo Endereço')
        )
    )
    .catch(err =>
      emitter.emit(
        enderecoEventsMap.HANDLE_ERROR,
        res,
        err,
        '> Erro ao buscar Usuário pelo ID para settar no Endereço'
      )
    );
}

/**
 * Atualiza um Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function updateEndereco(req, res) {
  setUsuarioInEndereco(req.body)
    .then(() =>
      Endereco.update(new EnderecoModel(req.body))
        .then(() => res.send())
        .catch(err =>
          emitter.emit(enderecoEventsMap.HANDLE_ERROR, res, err, '> Erro ao atualizar um Endereço')
        )
    )
    .catch(err =>
      emitter.emit(
        enderecoEventsMap.HANDLE_ERROR,
        res,
        err,
        '> Erro ao buscar Usuário pelo ID para settar no Endereço'
      )
    );
}

/**
 * Busca todos os Endereços
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function findAllEnderecos(req, res) {
  Endereco.findAll()
    .then(data => res.send(data))
    .catch(err =>
      emitter.emit(enderecoEventsMap.HANDLE_ERROR, res, err, '> Erro ao buscar todos os Endereços')
    );
}

/**
 * Busca um Endereço pelo ID
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function findEnderecoById(req, res) {
  Endereco.findOne({ where: { idEndereco: req.params.id } })
    .then(data => res.send(data))
    .catch(err =>
      emitter.emit(enderecoEventsMap.HANDLE_ERROR, res, err, '> Erro ao buscar Endereço pelo ID')
    );
}

/**
 * Deleta um Endereço pelo ID
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function deleteEnderecoById(req, res) {
  Endereco.destroy({ where: { idEndereco: req.params.id } })
    .then(() => res.send())
    .catch(err =>
      emitter.emit(enderecoEventsMap.HANDLE_ERROR, res, err, '> Erro ao deletar Endereço pelo ID')
    );
}

emitter.on(enderecoEventsMap.CREATE_ENDERECO, saveEndereco);
emitter.on(enderecoEventsMap.UPDATE_ENDERECO, updateEndereco);
emitter.on(enderecoEventsMap.FINDALL_ENDERECOS, findAllEnderecos);
emitter.on(enderecoEventsMap.FIND_ENDERECO_BYID, findEnderecoById);
emitter.on(enderecoEventsMap.DELETE_ENDERECO_BYID, deleteEnderecoById);

/**
 * Busca na base de dados e setta o Usuário no Endereço pelo ID do Usuário que veio no DTO do Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {EnderecoModel} endereco - DTO do Endereço
 * @returns {Promise} Promise da busca pelo Usuário
 */
function setUsuarioInEndereco(endereco) {
  return Usuario.findOne({ where: { idUsuario: endereco.usuario.idUsuario } }).then(
    data => (endereco.idUsuario = data.idUsuario)
  );
}
