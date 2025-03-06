'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1, // Số người tối đa trong phòng
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false, // Giá phòng mỗi kỳ (4 tháng)
      },
      status: {
        type: Sequelize.ENUM("not_filled", "full", "maintenance"),
        allowNull: false,
        defaultValue: "not_filled",
      },
      image: {
        type: Sequelize.STRING,  // Lưu URL hoặc đường dẫn ảnh
        allowNull: true,         // Có thể để trống nếu phòng chưa có ảnh
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rooms');
  }
};