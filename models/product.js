import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";



export const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  });
  
  Product.sync();

  export default Product;