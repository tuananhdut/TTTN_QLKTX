'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: true
      },
      birthdate: {
        type: Sequelize.DATEONLY, // Lưu ngày sinh
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
      },
      citizen_id: {
        type: Sequelize.STRING(12), // Căn cước công dân (CCCD)
        unique: true,
        allowNull: true
      },
      class: {
        type: Sequelize.STRING(50), // Lớp của sinh viên
        allowNull: true
      },
      avatar: {
        type: Sequelize.STRING, // Đường dẫn ảnh đại diện
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};