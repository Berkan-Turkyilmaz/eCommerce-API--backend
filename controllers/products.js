import Product from "../models/product.js";


// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Get a products by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const gotProductById = await Product.findByPk(id);
    if (!gotProductById) {
      return res.status(404).send("Product not found (getproductbyid) ");
    }
    res.json(gotProductById);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Create a new category
export const createProduct = async (req, res) => {
  try {
    const { id, name, description, price, categoryId } = req.body;
    const createdProduct = await Product.create(req.body);
    res.json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Update a category
export const updateProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const productToUpdate = await Product.findByPk(id);
    if (!productToUpdate) {
      return res.status(404).json({ error: "Product not found(update)" });
    }
    const updatedProduct = await Category.update(req.body);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Delete a user
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productToDelete = await Product.findByPk(id);
    if (!productToDelete) {
      return res.status(404).json({ error: "Product not found(delete)" });
    }
    await Product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
