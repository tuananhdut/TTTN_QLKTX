"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WaterReading extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một bản ghi chỉ số nước thuộc về một phòng
      WaterReading.belongsTo(models.Room, {
        foreignKey: "room_id",
        as: "room",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  WaterReading.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      previous_reading: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Chỉ số nước tháng trước",
      },
      current_reading: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Chỉ số nước tháng này",
      },
      record_month: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "Tháng ghi nhận chỉ số (YYYY-MM)",
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Giá nước trên mỗi m³",
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "rooms",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        comment: "ID của phòng liên kết",
      },
    },
    {
      sequelize,
      modelName: "WaterReading",
      tableName: "waterReadings",
      timestamps: true, // Vì migration có createdAt, updatedAt
      underscored: false, // Giữ nguyên kiểu đặt tên theo snake_case
    }
  );

  return WaterReading;
};
