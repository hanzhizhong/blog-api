'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Like.init({
    blog_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Like',
    tableName:"likes",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
  });
  return Like;
};