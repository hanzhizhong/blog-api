'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.Blog,{as:"blogs",foreignKey:"blog_id"});
      Reply.belongsTo(models.User,{as:"users",foreignKey:"user_id"})
    }
  };
  Reply.init({
    blog_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    content:{
      type:DataTypes.TEXT
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Reply',
    tableName:"replies",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
  });
  return Reply;
};