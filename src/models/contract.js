"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết với bảng Room (một hợp đồng thuộc về một phòng)
      Contract.belongsTo(models.Room, {
        foreignKey: "room_id",
        as: "room",
        onDelete: "CASCADE",
      });
    }
  }

  Contract.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "rooms", key: "id" },
        onDelete: "CASCADE",
      },
      people_count: { // 🆕 Thêm số lượng người trong hợp đồng
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Mặc định là 1 người
        validate: {
          min: 1, // Ít nhất phải có 1 người
        },
      },
      contract_type: { // 🆕 Thêm loại hợp đồng
        type: DataTypes.ENUM("monthly", "quarterly"),
        allowNull: false,
        defaultValue: "quarterly", // Mặc định là hợp đồng ngắn hạn
      },
      status: {
        type: DataTypes.ENUM("active", "expired", "canceled"),
        defaultValue: "active",
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
      modelName: "Contract",
      tableName: "contracts",
      timestamps: true, // Sequelize tự động quản lý createdAt & updatedAt
      underscored: true, // Giữ nguyên kiểu đặt tên theo snake_case
    }
  );

  return Contract;
};
