"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here if needed
    }
  }

  Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Số người tối đa trong phòng
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false, // Giá phòng mỗi kỳ (4 tháng)
      },
      status: {
        type: DataTypes.ENUM("available", "occupied", "maintenance"),
        allowNull: false,
        defaultValue: "available",
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
      modelName: "Room",
      tableName: "rooms",
      timestamps: true, // Đảm bảo Sequelize tự động cập nhật createdAt & updatedAt
    }
  );

  return Room;
};
