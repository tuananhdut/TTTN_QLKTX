'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('waterReadings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      previous_reading: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Chỉ số nước tháng trước",
      },
      current_reading: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Chỉ số nước tháng này",
      },
      record_month: {
        type: Sequelize.STRING(7),
        allowNull: false,
        comment: "Tháng ghi nhận chỉ số (YYYY-MM)",
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Giá nước trên mỗi m³",
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "rooms", // Bảng rooms phải tồn tại trước
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "ID của phòng liên kết",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      // updatedAt: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      // },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), 
    },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('waterReadings');
  }
};