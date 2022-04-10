import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  { dialect: 'mysql', storage: __dirname + '/db.mysql' }
);