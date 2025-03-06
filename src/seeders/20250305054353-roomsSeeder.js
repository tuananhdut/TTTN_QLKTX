'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("rooms", [
      {
        name: "Phòng A101",
        capacity: 4,
        price: 2600000, // Giá phòng mỗi kỳ (4 tháng)
        status: "available",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phòng A102",
        capacity: 6,
        price: 3000000,
        status: "occupied",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phòng B201",
        capacity: 3,
        price: 2000000,
        status: "maintenance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
