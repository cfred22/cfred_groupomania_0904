// Database connection

module.exports = (Sequelize) => {
    const sequelize = new Sequelize(
      "groupomania",
      "root",
      "tomjul",
      {
        dialect: "mysql",
        host: "127.0.0.1"
      }
    );

  
    sequelize.authenticate();
  
    return sequelize;
  };