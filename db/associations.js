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

// Order has many Products through OrderProduct
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: { allowNull: false, name: "orderId" },
  otherKey: "productId",
  as: "products",
});

// Product has many Orders through OrderProduct
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: { allowNull: false, name: "productId" },
  otherKey: "orderId",
  as: "orders",
});

export { User, Product, Order, Category };
