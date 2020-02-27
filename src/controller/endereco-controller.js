const EventEmitter = require('../events');
const emitter = new EventEmitter().getInstance();
const enderecoEventsMap = require('../events-map/endereco-events');
const models = require('../../models');
const Endereco = models.endereco;
const Usuario = models.usuario;
const { EnderecoModel } = require('../../models/endereco');
const tipoEnderecoEnum = require('../enumeration/tipo-endereco-enum');

/**
 * Salva um novo Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function saveEndereco(req, res) {
  setUsuarioInEndereco(req.body)
    .then(() => {
      const endereco = new EnderecoModel(req.body);
      endereco.idEndereco = null;

      Endereco.create(endereco)
        .then(data => res.send(data))
        .catch(err =>
          emitter.emit(enderecoEventsMap.HANDLE_ERROR, res, err, '> Erro ao salvar novo Endereço')
        );
    })
    .catch(err => handleErrorSetUsuarioInEndereco(res, err));
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
    .catch(err => handleErrorSetUsuarioInEndereco(res, err));
}

/**
 * Busca todos os Endereços
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function findAllEnderecos(req, res) {
  Endereco.findAll({ include: Usuario })
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
  Endereco.findByPk(req.params.id, { include: Usuario })
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

/**
 * Busca os Endereços filtrando pelo Usuário
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function findEnderecosByUsuario(req, res) {
  Endereco.findAll({ where: { idUsuario: req.params.idUsuario } })
    .then(data => res.send(data))
    .catch(err =>
      emitter.emit(
        enderecoEventsMap.HANDLE_ERROR,
        res,
        err,
        '> Erro ao buscar os Endereços pelo Usuário'
      )
    );
}

/**
 * Busca os Endereços residenciais
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function findEnderecosResidenciais(req, res) {
  Endereco.findAll({ where: { tpEndereco: tipoEnderecoEnum.RESIDENCIAL } })
    .then(data => res.send(data))
    .catch(err =>
      emitter.emit(
        enderecoEventsMap.HANDLE_ERROR,
        res,
        err,
        '> Erro ao buscar os Endereços residenciais'
      )
    );
}

emitter.on(enderecoEventsMap.CREATE_ENDERECO, saveEndereco);
emitter.on(enderecoEventsMap.UPDATE_ENDERECO, updateEndereco);
emitter.on(enderecoEventsMap.FINDALL_ENDERECOS, findAllEnderecos);
emitter.on(enderecoEventsMap.FIND_ENDERECO_BYID, findEnderecoById);
emitter.on(enderecoEventsMap.DELETE_ENDERECO_BYID, deleteEnderecoById);
emitter.on(enderecoEventsMap.FIND_ENDERECOS_BYUSUARIO, findEnderecosByUsuario);
emitter.on(enderecoEventsMap.FIND_ENDERECOS_RESIDENCIAIS, findEnderecosResidenciais);

/**
 * Busca na base de dados e setta o Usuário no Endereço pelo ID do Usuário que veio no DTO do Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {EnderecoModel} endereco - DTO do Endereço
 * @returns {Promise} Promise da busca pelo Usuário
 */
function setUsuarioInEndereco(endereco) {
  return Usuario.findByPk(endereco.usuario.idUsuario).then(
    data => (endereco.idUsuario = data.idUsuario)
  );
}

/**
 * Trata um erro que ocorrer no processo de busca de Usuário para settar no Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Response} res - Response
 * @param {*} err - Erro
 */
function handleErrorSetUsuarioInEndereco(res, err) {
  emitter.emit(
    enderecoEventsMap.HANDLE_ERROR,
    res,
    err,
    '> Erro ao buscar Usuário pelo ID para settar no Endereço'
  );
}
