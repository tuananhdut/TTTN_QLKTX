"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một thiết bị có thể thuộc một phòng
      Device.belongsTo(models.Room, {
        foreignKey: "room_id",
        as: "room",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }

  Device.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "rooms",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      status: {
        type: DataTypes.ENUM("available", "in_use", "maintenance"),
        allowNull: false,
        defaultValue: "available",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Device",
      tableName: "devices",
      timestamps: true, // Vì migration có createdAt, updatedAt
      underscored: false,
    }
  );

  return Device;
};
