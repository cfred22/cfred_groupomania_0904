// imports
import { DataTypes } from "sequelize";
import { sequelize } from "../database";


// User model table 

export const UserModele = sequelize.define('User', {

  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // allowNull defaults to true
  }
},{ tableName: 'user', timestamps: false });





