import { Order, Product, User } from "../db/associations.js";
import { OrderProduct } from "../models/orderProduct.js";
import { orderSchema } from "../schemas/orderSchema.js";



export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Product,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    });

  if (orders) {
    res.json(orders)}
    else {
res.status(500).json({error: error.message})
  }
 }
catch (error) {
res.status(400).json({error: error.message })
}};


export const getOrderById = async (req, res) => {
  
try {
const order = await Order.findByPk(req.params.id, {include: Product});

if (order) {
  res.json(order);
} else {
  res.status(404).json({error: 'order not found'})
};
} catch (error) {
  res.status(500).json({error: error.message})
}};




export const createOrder = async (req, res) => {

const { error } = orderSchema.validate(req.body);
  
if(error) {
  res.status(400).json({error: error.details[0].message})
}
try {
  
  const userExists = await User.findByPk(req.body.userId);

if (!userExists) {
  res.status(400).json({error: 'user doesnt exist,cant create order'})
}

const productIds = req.body.products.map(p => p.productId);
const productsExist = await Product.findAll({
  where: {id: productIds}
});

if (productsExist.length !== productIds.length) {
  res.status(400).json({error: 'Some products do not exist'});
}

const order = await Order.create({
  userId: req.body.userId,
  total: req.body.total
});

const orderProducts = req.body.products.map(p => ({
  orderId: order.id,
  productId: p.productId,
  quantity: p.quantity
}));

await OrderProduct.bulkCreate(orderProducts);
res.status(201).json(order);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

export const updateOrder = async (req, res) => {

  const { error } = orderSchema.validate(req.body);
if(error) {
  res.status(400).json({error: error.details[0].message})
}
try {
  const order = await Order.findByPk(req.params.id);
    if (!order) {
res.status(404).json({error:'order not found'})
    };
  
    await order.update({ total: req.body.total });
    await order.setProducts(req.body.products.map(p => ({ ...p, OrderId: order.id })));  const [updated] = orderSchema.

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const deleted = await db.Order.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
