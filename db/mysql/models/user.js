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
      // define association here
    }
  };
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false
    },
    passwd:{
      type:DataTypes.STRING,
      allowNull:false 
    },
    gender:{
      type:DataTypes.ENUM,
      values:['none','female','male'],
      defaultValue:'none'
    },
    nickname:{
      type:DataTypes.STRING
    },
    birthday:{
      type:DataTypes.DATE,
      defaultValue:new Date(1970,5,23) 
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName:"users",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
  });
  return User;
};