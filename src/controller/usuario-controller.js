const EventEmitter = require('../events');
const emitter = new EventEmitter().getInstance();
const usuarioEventsMap = require('../events-map/usuario-events');
const models = require('../../models');
const Usuario = models.usuario;
const Endereco = models.endereco;
const { UsuarioModel } = require('../../models/usuario');

/**
 * Salva um novo Usuário
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function saveUsuario(req, res) {
  const usuario = new UsuarioModel(req.body);
  usuario.idUsuario = null;

  Usuario.create(usuario)
    .then(data => res.send(data))
    .catch(err =>
      emitter.emit(usuarioEventsMap.HANDLE_ERROR, res, err, '> Erro ao salvar novo Usuário')
    );
}

/**
 * Atualiza um Usuário
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function updateUsuario(req, res) {
  Usuario.update(new UsuarioModel(req.body), { where: { idUsuario: req.body.idUsuario } })
    .then(() => res.send())
    .catch(err =>
      emitter.emit(usuarioEventsMap.HANDLE_ERROR, res, err, '> Erro ao atualizar um Usuário')
    );
}

/**
 * Busca todos os Usuários
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function findAllUsuarios(req, res) {
  Usuario.findAll({ include: { model: Endereco, as: 'enderecoList' } })
    .then(data => res.send(data))
    .catch(err =>
      emitter.emit(usuarioEventsMap.HANDLE_ERROR, res, err, '> Erro ao buscar todos os Usuários')
    );
}

/**
 * Busca um Usuário pelo ID
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function findUsuarioById(req, res) {
  res.Usuario.findByPk(req.params.id, { include: { model: Endereco, as: 'enderecoList' } })
    .then(data => res.send(data))
    .catch(err =>
      emitter.emit(usuarioEventsMap.HANDLE_ERROR, res, err, '> Erro ao buscar Usuário pelo ID')
    );
}

/**
 * Deleta um Usuário pelo ID
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
function deleteUsuarioById(req, res) {
  Usuario.destroy({ where: { idUsuario: req.params.idUsuario } })
    .then(() => res.send())
    .catch(err =>
      emitter.emit(usuarioEventsMap.HANDLE_ERROR, res, err, '> Erro ao deletar Usuário pelo ID')
    );
}

emitter.on(usuarioEventsMap.CREATE_USUARIO, saveUsuario);
emitter.on(usuarioEventsMap.UPDATE_USUARIO, updateUsuario);
emitter.on(usuarioEventsMap.FINDALL_USUARIOS, findAllUsuarios);
emitter.on(usuarioEventsMap.DELETE_USUARIO_BYID, deleteUsuarioById);
emitter.on(usuarioEventsMap.FIND_USUARIO_BYID, findUsuarioById);
