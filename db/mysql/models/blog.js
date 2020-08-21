'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User,{foreignKey:"user_id",as:"users"})
    }
  };
  Blog.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false
    },
    content:{
      type:DataTypes.TEXT
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    likes_count:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    replies_count:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'Blog',
    timestamps:true,
    tableName:"blogs",
    createdAt:"created_at",
    updatedAt:"updated_at"
  });
  return Blog;
};