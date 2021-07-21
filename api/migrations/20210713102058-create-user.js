'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      alamat: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM('Admin', 'Member'),
      },
      email_status: {
        allowNull: false,
        type: Sequelize.ENUM('Unverified', 'Verified'),
        defaultValue: 'Unverified'
      },
      email_verified_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      token_expired_at: {
        allowNull: true,
        type: Sequelize.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};