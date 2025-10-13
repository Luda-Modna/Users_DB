'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          body: 'ToDo body',
          deadline: '2025-10-20',
          user_id:6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body: 'ToDo menu',
          deadline: '2025-10-21',
          user_id:12,
          created_at: new Date(),
          updated_at: new Date(),
        },      {
          body: 'ToDo task',
          deadline: '2025-10-22',
          user_id:2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
