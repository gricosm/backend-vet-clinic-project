'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Pet extends Model {
        static associate (models) {
            Pet.belongsTo(models.User, { foreignKey: 'userId' } );
            Pet.hasMany(models.Appointment, { foreignKey: 'petId' } );
        };
    };

    Pet.init ({
        name: DataTypes.STRING,
        age: DataTypes.STRING,
        type: DataTypes.STRING,
        breed: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'Pet',
    });
    return Pet;
}