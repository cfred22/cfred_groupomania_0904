
const Sequelize = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect:'mysql' 
});

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('Users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      // allowNull defaults to true
    }
  },
  { tableName: 'User' }); 
    
  return User;
};

module.exports = sequelize
