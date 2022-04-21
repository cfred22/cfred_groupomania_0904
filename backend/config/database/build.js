
/*
  [ATTENTION] this file does not create the database
  this file use the models to create the tables (if they don't exists)
*/
module.exports = (sequelize, Sequelize) => {
    const db = {};
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  
    db.user = require("../../models/User")(sequelize, Sequelize);
    db.post = require("../../models/Post")(sequelize, Sequelize);

  
    db.sequelize.sync();
  };