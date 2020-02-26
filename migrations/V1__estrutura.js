/**
 * @author Bruno Eduardo
 * @since 26/02/2020
 */
const migration = {
  up: (queryInterface, DataTypes) => {
    return queryInterface
      .createTable('usuario', {
        idUsuario: {
          field: 'id_usuario',
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        nmUsuario: {
          field: 'nm_usuario',
          type: DataTypes.STRING,
          allowNull: false
        },
        dtNascimento: {
          field: 'dt_nascimento',
          type: DataTypes.DATE,
          allowNull: true
        }
      })
      .then(() =>
        queryInterface.createTable('endereco', {
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
        })
      )
      .catch(console.error);
  },
  down: async (queryInterface, DataTypes) => {
    return queryInterface
      .dropTable('endereco')
      .then(() => queryInterface.dropTable('usuario'))
      .catch(console.error);
  }
};

module.exports = migration;
