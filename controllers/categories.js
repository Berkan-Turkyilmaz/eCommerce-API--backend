import Category from "../models/category.js";


// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gotCategoryById = await Category.findByPk(id);
    if (!gotCategoryById) {
      return res.status(404).send("Category not found(getcategorybyid");
    }
    res.json(gotCategoryById);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const createdCategory = await Category.create(req.body);
    res.json(createdCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const categoryToUpdate = await Category.findByPk(id);
    if (!categoryToUpdate) {
      return res.status(404).json({ error: "Category not found(update)" });
    }
    const updatedCategory = await Category.update(req.body);
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Delete a user
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryToDelete = await Category.findByPk(id);
    if (!categoryToDelete) {
      return res.status(404).json({ error: "Category not found(delete)" });
    }
    await user.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
