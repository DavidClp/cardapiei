'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Localizacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Localizacao.belongsTo(models.Estabelecimento, {foreignKey: 'est_id', as: 'estabelecimento'})
    }
  }
  Localizacao.init({
    est_id: DataTypes.INTEGER,
    cep: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Localizacao',
    tableName: 'localizacao',
    paranoid: true
  });
  return Localizacao;
};