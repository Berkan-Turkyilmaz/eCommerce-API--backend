import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("User", {
 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync();

export default User;
