const { Sequelize } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
          
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        /*likes:{ 
          type: DataTypes.NUMBER, 
          default:0 ,
          allowNull: true,
        },
        usersLiked : {
          type : DataTypes.JSON,
          allowNull: true,
        },*/
        
        
        
      },
      {
        underscored: true,
      }
    );
  
  return Post;
};