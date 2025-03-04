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
