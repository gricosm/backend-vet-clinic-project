'use strict';

module.exports = {

    up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Paco',
      lastName: 'Porras',
      mail: 'paco@paco.com',
      password: "$10$zT.ryA.U0TmKPy0iiwbec.wcxRvVzwy6PMvIxGypYrYRPwRcmR2JG",
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], [{
      id: 2,
      name: 'Jose Luis',
      lastName: 'Contacto',
      mail: 'joseluis@joseluis.com',
      password: "$10$zT.ryA.U0TmKPy0iiwbec.wcxRvVzwy6PMvIxGypYrYRPwRcmR2JG",
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
}