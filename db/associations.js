import sequelize from "./index.js";

import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import Category from "../models/category.js";

// Order belongs to User
Order.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
  as: "user",
});

// User has many Orders
User.hasMany(Order, {
  foreignKey: { allowNull: false, name: "userId" },
  as: "orders",
});

export { User, Product, Order, Category };
