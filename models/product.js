import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

 const Product = sequelize.define("Product", {
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.sync();

export default Product;
