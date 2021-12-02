'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,},
        
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        mail: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validation: { isEmail: true, }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
