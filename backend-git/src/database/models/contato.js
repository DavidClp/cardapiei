'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contato.belongsTo(models.Estabelecimento, {foreignKey: 'est_id', as: 'estabelecimento'})
    }
  }
  Contato.init({
    tipo: DataTypes.STRING,
    contato: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contato',
    tableName: "contatos",
    paranoid: true
  });
  return Contato;
};