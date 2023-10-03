'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class horario_atendimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      horario_atendimento.belongsTo(models.Estabelecimento, {foreignKey: 'est_id', as: 'estabelecimento'})
    }
  }
  horario_atendimento.init({
    dia: DataTypes.STRING,
    hor_abre: DataTypes.TIME,
    hor_fecha: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'horario_atendimento',
    tableName: 'horarios',
    paranoid: true
  });
  return horario_atendimento;
};