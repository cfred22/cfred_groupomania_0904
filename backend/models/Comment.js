const { Sequelize } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
      },
      {
        underscored: true,
      }
    );
  
  return Comment;
};






