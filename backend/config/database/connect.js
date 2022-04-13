// Database connection

module.exports = (Sequelize) => {
    const sequelize = new Sequelize(
      "groupomania",
      "root",
      "groupomania22",
      {
        dialect: "mysql",
        host: "127.0.0.1"
      }
    );

  
    sequelize.authenticate();
  
    return sequelize;
  };