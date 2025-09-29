'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'm@m.com',
          passw_hash: '1234',
          birthday: '2020-10-12',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'Jane',
          last_name: 'Dove',
          email: 'm2@m.com',
          passw_hash: '1234',
          birthday: '2022-10-12',
          gender: 'female',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'Test',
          last_name: 'Testovich',
          email: 'm3@m.com',
          passw_hash: '1234',
          birthday: '2021-11-12',
          gender: 'other',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
