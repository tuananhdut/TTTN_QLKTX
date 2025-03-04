"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BillItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // BillItem thuộc về một MonthlyBill
      BillItem.belongsTo(models.MonthlyBill, {
        foreignKey: "bill_id",
        as: "bill",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  BillItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "monthlyBills",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "BillItem",
      tableName: "billItems",
      timestamps: true, // Vì migration có createdAt, updatedAt
      underscored: true, // Giữ nguyên kiểu đặt tên theo snake_case
    }
  );

  return BillItem;
};
