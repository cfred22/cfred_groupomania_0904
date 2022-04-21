
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        /*firstname: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },*/
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        underscored: true,
      }
    );
  
  return User;
};


