'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      est_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: 'estabelecimentos'
          },
          key: 'id'
        }
      },
      dia: {
        type: Sequelize.STRING
      },
      hor_abre: {
        type: Sequelize.TIME
      },
      hor_fecha: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('horarios');
  }
};