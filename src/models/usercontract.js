"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết với bảng User (một user có thể có nhiều hợp đồng)
      UserContract.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Liên kết với bảng Contract (một hợp đồng có thể có nhiều user)
      UserContract.belongsTo(models.Contract, {
        foreignKey: "contractId",
        as: "contract",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  UserContract.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      contractId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "contracts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "UserContract",
      tableName: "userContracts",
      timestamps: false, // Vì migration không có createdAt, updatedAt
      underscored: true, // Để giữ nguyên kiểu đặt tên theo snake_case
    }
  );

  return UserContract;
};
