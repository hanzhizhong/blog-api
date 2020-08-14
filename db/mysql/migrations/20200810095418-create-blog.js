'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('blogs');
  }
};