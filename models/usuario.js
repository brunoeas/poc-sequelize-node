const getDefaultConfig = require('../config/default-table-config');

/**
 * Classe modelo do Usuário
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class UsuarioModel
 */
class UsuarioModel {
  /**
   * Cria uma instância do model do Usuário
   *
   * @author Bruno Eduardo <bruno.soares@kepha.com.br>
   * @param {*} [{ idUsuario = undefined, nmUsuario = undefined, dtNascimento = undefined }={}] - Props
   * @param {boolean} [isNew=false] - Se ja está persistido no banco de dados = false; se não = true; default = false;
   */
  constructor(
    { idUsuario = undefined, nmUsuario = undefined, dtNascimento = undefined } = {},
    isNew = false
  ) {
    this.idUsuario = isNew ? null : idUsuario;
    this.nmUsuario = nmUsuario;
    this.dtNascimento = dtNascimento;
  }
}

/**
 * Gera o modelo do Usuário
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {*} sequelize - Sequelize
 * @param {*} DataTypes - Tipos de dados
 * @returns Definição da tabela Usuário
 */
const entity = (sequelize, DataTypes) =>
  sequelize.define(
    'usuario',
    {
      idUsuario: {
        field: 'id_usuario',
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nmUsuario: {
        field: 'nm_usuario',
        allowNull: false,
        type: DataTypes.STRING
      },
      dtNascimento: {
        field: 'dt_nascimento',
        type: DataTypes.DATE
      }
    },
    getDefaultConfig()
  );

module.exports = {
  default: entity,
  UsuarioModel
};
