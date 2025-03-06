'use strict';


// import { hashedPassword } from '../utils/passwordUtil'
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        fullname: 'user',
        email: 'user@example.com',
        phone: '0901234567',
        birthdate: '2000-01-15',
        password: hashedPassword,
        role: 'user',
        citizen_id: '012345678901',
        class: 'KTX-01',
        avatar: 'avatar_a.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'admin',
        email: 'admin@example.com',
        phone: '0912345678',
        birthdate: '1999-05-22',
        password: hashedPassword,
        role: 'admin',
        citizen_id: '012345678902',
        class: 'KTX-02',
        avatar: 'avatar_b.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'Lê Văn C',
        email: 'levanc@example.com',
        phone: '0923456789',
        birthdate: '2001-09-10',
        password: hashedPassword,
        role: 'user',
        citizen_id: '012345678903',
        class: 'KTX-03',
        avatar: 'avatar_c.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
