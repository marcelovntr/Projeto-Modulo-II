"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locais", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nomeLocal: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      localidade: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DECIMAL(10,8),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(10,8),
        allowNull: true
      },
      praticasPermitidas:{
        type: Sequelize.STRING(200),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locais");
  },
};
