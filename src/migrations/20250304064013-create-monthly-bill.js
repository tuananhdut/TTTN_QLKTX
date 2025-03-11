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
        allowNull: true,
        references: {
          model: "users", // Giả định bảng sinh viên là "users"
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "ID của sinh viên",
      },
      bill_month: {
        type: Sequelize.STRING(7), // Lưu theo định dạng "YYYY-MM"
        allowNull: false,
        validate: {
          is: /^\d{4}-(0[1-9]|1[0-2])$/, // Chỉ chấp nhận YYYY-MM với tháng từ 01-12
        },
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
    await queryInterface.addConstraint('monthlyBills', {
      fields: ['bill_month', 'room_id'],
      type: 'unique',
      name: 'unique_bill_month_room'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('monthlyBills');
  }
};