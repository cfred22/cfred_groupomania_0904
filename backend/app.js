// Import et création de express
const express = require('express');
const app = express();

const { Sequelize } = require("sequelize");
const sequelize = require("./config/database/connect")(Sequelize);
require("./config/database/build")(sequelize, Sequelize)

module.exports = app;


