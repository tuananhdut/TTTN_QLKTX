'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BillItem extends Model {
    static associate(models) {
      // Liên kết với bảng MonthlyBill
      BillItem.belongsTo(models.MonthlyBill, {
        foreignKey: "bill_id",
        as: "bill",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      // Liên kết với bảng ServiceRate
      BillItem.belongsTo(models.ServiceRate, {
        foreignKey: "service_id",
        as: "service",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "monthlyBills", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "service_rates", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      previous_reading: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      current_reading: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "BillItem",
      tableName: "billItems",
      timestamps: true, // Sequelize tự động quản lý createdAt & updatedAt
      underscored: false, // Giữ nguyên kiểu đặt tên theo snake_case
      hooks: {
        beforeSave: async (billItem, options) => {
          const serviceRate = await sequelize.models.ServiceRate.findByPk(billItem.service_id);
          if (serviceRate) {
            billItem.price = (billItem.current_reading - billItem.previous_reading) * serviceRate.unit_price;
          }
        },
      },
    }
  );

  return BillItem;
};
