const getDefaultConfig = require('../config/default-table-config');

/**
 * Classe modelo do Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class EnderecoModel
 */
class EnderecoModel {
  /**
   * Cria uma instância do model do Endereço
   *
   * @author Bruno Eduardo <bruno.soares@kepha.com.br>
   * @param {*} [{
   *       idEndereco = undefined,
   *       dsRua = undefined,
   *       nrEndereco = undefined,
   *       dsBairro = undefined,
   *       tpEndereco = undefined,
   *       idUsuario = undefined
   *     }={}] - Props
   * @param {boolean} [isNew=false] - Se ja está persistido no banco de dados = false; se não = true; default = false;
   */
  constructor(
    {
      idEndereco = undefined,
      dsRua = undefined,
      nrEndereco = undefined,
      dsBairro = undefined,
      tpEndereco = undefined,
      idUsuario = undefined
    } = {},
    isNew = false
  ) {
    this.idEndereco = isNew ? null : idEndereco;
    this.dsRua = dsRua;
    this.nrEndereco = nrEndereco;
    this.dsBairro = dsBairro;
    this.tpEndereco = tpEndereco;
    this.idUsuario = idUsuario;
  }
}

/**
 * Gera o modelo do Endereço
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {*} sequelize - Sequelize
 * @param {*} DataTypes - Tipos de dados
 * @returns Definição da tabela Endereço
 */
const entity = (sequelize, DataTypes) =>
  sequelize.define(
    'endereco',
    {
      idEndereco: {
        field: 'id_endereco',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      dsRua: {
        field: 'ds_rua',
        type: DataTypes.STRING,
        allowNull: false
      },
      nrEndereco: {
        field: 'nr_endereco',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      dsBairro: {
        field: 'ds_bairro',
        type: DataTypes.STRING,
        allowNull: false
      },
      tpEndereco: {
        field: 'tp_endereco',
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      idUsuario: {
        field: 'id_usuario',
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'usuario'
          },
          key: 'id_usuario'
        }
      }
    },
    getDefaultConfig()
  );

module.exports = {
  default: entity,
  EnderecoModel
};
