import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

export const Users = sequelize.define("Users", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.sync();

export default Users;
