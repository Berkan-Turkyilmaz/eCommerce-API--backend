import sequelize from "../db";
import { DataTypes } from "sequelize";



export const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    products: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  });
  
  Order.sync();

  export default Order;