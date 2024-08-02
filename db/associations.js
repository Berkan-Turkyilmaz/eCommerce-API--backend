import sequelize from "./index.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import Category from "../models/category.js";


User.hasMany(Order, { foreignKey: { name: "userId", allowNull: false } });
Order.belongsTo(User, { foreignKey: { name: "userId", allowNull: false } });

Category.hasMany(Product, { foreignKey: { name: "categoryId", allowNull: false } });
Product.belongsTo(Category, { foreignKey: { name: "categoryId", allowNull: false } });

Order.belongsToMany(Product, { through: 'OrderProducts', foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: 'OrderProducts', foreignKey: 'productId' })

sequelize.sync({ alter: true });

export { User, Order, Product, Category };