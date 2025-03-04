'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('monthlyBills', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Giả định bảng sinh viên là "users"
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "ID của sinh viên",
      },
      bill_month: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: "Tháng lập hóa đơn (YYYY-MM)",
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Tổng số tiền phải thanh toán",
      },
      payment_status: {
        type: Sequelize.ENUM("pending", "paid", "overdue"),
        allowNull: false,
        defaultValue: "pending",
        comment: "Trạng thái thanh toán (chờ thanh toán, đã thanh toán, quá hạn)",
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "rooms", // Giả định bảng phòng là "rooms"
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
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('monthlyBills');
  }
};