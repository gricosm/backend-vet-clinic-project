'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pets', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,},
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      type: DataTypes.STRING,
      breed: DataTypes.STRING,      
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('pets');
  }
};
