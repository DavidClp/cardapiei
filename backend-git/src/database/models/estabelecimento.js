'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estabelecimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estabelecimento.belongsTo(models.Usuario, {foreignKey: 'usu_id', as: 'usuario'});
      Estabelecimento.hasMany(models.Categoria, {foreignKey: 'est_id'});
    //  Estabelecimento.hasMany(models.Contato, {foreignKey: 'est_id'});
      Estabelecimento.hasMany(models.Localizacao, {foreignKey: 'est_id'});
      Estabelecimento.hasMany(models.horario_atendimento, {foreignKey: 'est_id'});
    }
  }
  Estabelecimento.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    logo: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estabelecimento',
    tableName: 'estabelecimentos',
    paranoid: true
  });
  return Estabelecimento;
};