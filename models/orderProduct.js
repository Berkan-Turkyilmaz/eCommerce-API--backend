import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";


    export const OrderProduct = sequelize.define('OrderProduct', {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
  
  