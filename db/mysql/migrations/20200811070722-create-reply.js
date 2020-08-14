'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('replies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blog_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      content:{
        type:Sequelize.TEXT
      },
      user_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date(Date.now())
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date(Date.now())
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('replies');
  }
};