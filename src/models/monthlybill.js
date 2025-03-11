"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MonthlyBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Hóa đơn thuộc về một sinh viên (user)
      MonthlyBill.belongsTo(models.User, {
        foreignKey: "student_id",
        as: "student",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Hóa đơn thuộc về một phòng
      MonthlyBill.belongsTo(models.Room, {
        foreignKey: "room_id",
        as: "room",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // Hóa đơn có nhiều mục chi tiết (BillItem)
      MonthlyBill.hasMany(models.BillItem, {
        foreignKey: "bill_id",
        as: "billItems",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  MonthlyBill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        comment: "ID của sinh viên",
      },
      bill_month: {
        type: DataTypes.STRING(7), // Chỉ lưu "YYYY-MM"
        allowNull: false,
        validate: {
          is: /^\d{4}-(0[1-9]|1[0-2])$/, // Định dạng YYYY-MM
        },
        comment: "Tháng lập hóa đơn (YYYY-MM)",
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Tổng số tiền phải thanh toán",
      },
      payment_status: {
        type: DataTypes.ENUM("pending", "paid", "overdue"),
        allowNull: false,
        defaultValue: "pending",
        comment: "Trạng thái thanh toán (chờ thanh toán, đã thanh toán, quá hạn)",
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "rooms",
          key: "id",
        },
        comment: "ID của phòng liên kết",
      },
    },
    {
      sequelize,
      modelName: "MonthlyBill",
      tableName: "monthlyBills",
      timestamps: true, // Vì migration có createdAt, updatedAt
      underscored: false, // Giữ nguyên kiểu đặt tên theo snake_case
    }
  );

  return MonthlyBill;
};
