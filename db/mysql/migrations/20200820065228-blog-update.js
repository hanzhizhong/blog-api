'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('blogs','likes_count',{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:0
    });
    await queryInterface.addColumn('blogs','replies_count',{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:0
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('blogs','likes_count');
    await queryInterface.removeColumn('blogs','replies_count')
  }
};
