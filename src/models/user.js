'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserContract, {
        foreignKey: "user_id",
        as: "userContracts",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: true
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    },
    citizen_id: {
      type: DataTypes.STRING(12),
      allowNull: true,
      unique: true
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true
    });
  return User;
};