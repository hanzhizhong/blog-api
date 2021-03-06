'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false 
      },
      passwd:{
        type:Sequelize.STRING,
        allowNull:false
      },
      gender:{
        type:Sequelize.ENUM,
        values:['male','female','none'],
        defaultValue:'male'
      },
      nickname:{
        type:Sequelize.STRING
      },
      birthday:{
        type:Sequelize.DATE,
        defaultValue:new Date(1968,9,23)
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
    await queryInterface.dropTable('users');
  }
};