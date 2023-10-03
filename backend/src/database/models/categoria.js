'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categoria.belongsTo(models.Estabelecimento, {foreignKey: 'est_id', as: 'estabelecimento'})
      Categoria.hasMany(models.Produto, {foreignKey: 'cat_id'});
    }
  }
  Categoria.init({
    nome: DataTypes.STRING,
    est_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    paranoid: true
  });
  return Categoria;
};