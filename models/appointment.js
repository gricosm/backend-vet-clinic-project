'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.User, { foreignKey: 'userId' } );
      Appointment.belongsTo(models.Pet, {foreignKey : 'petId'})
    };
  };

  Appointment.init({
    date: DataTypes.DATE,
    state: DataTypes.STRING,
    doctor: DataTypes.STRING,
  }, 
  {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
}