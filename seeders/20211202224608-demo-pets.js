'use strict';

module.exports = {

    up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pets', [{
      id: 1,
      name: 'Brownie',
      age: 4,
      type: 'Perro',
      breed: 'Mastin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'Bond',
      age: 12,
      type: 'Perro',
      breed: 'Spanier Breton',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: 'Leben',
      age: 4,
      type: 'Perro',
      breed: 'Pastor Australiano',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      name: 'Auri',
      age: 5,
      type: 'Perro',
      breed: 'Husky Siberiano',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 5,
      name: 'Hachiko',
      age: 6,
      type: 'Perro',
      breed: 'Shiba Inu',
      createdAt: new Date(),
      updatedAt: new Date()
    }], 
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pets', null, {});
  }
}