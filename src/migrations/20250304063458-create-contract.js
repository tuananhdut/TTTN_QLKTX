'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contracts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "rooms", key: "id" }, // Liên kết tới bảng rooms
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("active", "expired", "canceled"),
        defaultValue: "active",
        allowNull: false,
      },
      people_count: { // 🆕 Thêm số lượng người trong hợp đồng
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1, // Mặc định là 1 người
        validate: {
          min: 1, // Ít nhất phải có 1 người
        },
      },
      contract_type: { // 🆕 Thêm loại hợp đồng
        type: Sequelize.ENUM("monthly", "quarterly"),
        allowNull: false,
        defaultValue: "quarterly", // Mặc định là hợp đồng theo quý (4 tháng)
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contracts');
  }
};