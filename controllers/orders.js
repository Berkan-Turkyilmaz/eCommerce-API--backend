import {} from "../db/associations.js";

const getProductPrice = async (productId) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product.price;
  } catch (error) {
    throw new Error(`Error fetching product price: ${error.message}`);
  }
};

// GET /orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /orders
export const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    if (!userId || !products || !Array.isArray(products))
      return res
        .status(400)
        .json({ error: "userId and products array are required" });

    let total = 0;
    for (const item of products) {
      const price = await getProductPrice(item.productId);
      total += item.quantity * price;
    }

    const order = await Order.create({ userId, products, total });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /orders/:id
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /orders/:id
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, products } = req.body;
    if (!userId || !products || !Array.isArray(products))
      return res
        .status(400)
        .json({ error: "userId and products array are required" });

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    let total = 0;
    for (const item of products) {
      const price = await getProductPrice(item.productId);
      total += item.quantity * price;
    }

    await order.update({ userId, products, total });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
