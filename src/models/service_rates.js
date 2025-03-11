'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceRate extends Model {
    static associate(models) {
      // Liên kết với bảng BillItem
      ServiceRate.hasMany(models.BillItem, {
        foreignKey: "service_id",
        as: "bill_items",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  ServiceRate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01, // Đảm bảo giá trị hợp lệ
        },
      },
      effective_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      service_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ServiceRate",
      tableName: "service_rates",
      timestamps: false, // Bảng này không có createdAt và updatedAt
      underscored: true,
    }
  );

  return ServiceRate;
};
