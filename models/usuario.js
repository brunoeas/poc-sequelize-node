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
   */
  constructor({ idUsuario = undefined, nmUsuario = undefined, dtNascimento = undefined } = {}) {
    this.idUsuario = idUsuario;
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
function entity(sequelize, DataTypes) {
  const Usuario = sequelize.define(
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

  Usuario.hasMany(sequelize.models.endereco, { foreignKey: 'idUsuario', as: 'enderecoList' });

  return Usuario;
}

module.exports = {
  default: entity,
  UsuarioModel
};
