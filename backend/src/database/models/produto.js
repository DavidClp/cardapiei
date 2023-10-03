'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.belongsTo(models.Categoria, {foreignKey: 'cat_id', as: "categoria"})
      }
    }
  
  Produto.init({
    nome: DataTypes.STRING,
    cat_id: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    imagem: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos',
    paranoid: true
  });
  return Produto;
};