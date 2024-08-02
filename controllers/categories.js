import { Category } from "../db/associations.js";
import { categorySchema } from "../schemas/categorySchema.js";


// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: { exclude: ['password','createdAt', 'updatedAt'] }});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    
    const gotCategoryById = await Category.findByPk(req.params.id);
    if (!gotCategoryById) {
      return res.status(404).send("Category not found");
    } else {
    res.json({id:gotCategoryById.id, name:gotCategoryById.name})}; 
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Create a new category
export const createCategory = async (req, res) => {
  try {
    
const { error } = categorySchema.validate(req.body);
if (error) {
  return res.status(400).json({error: error.details[0].message})
} else {
 const createdCategory = await Category.create(req.body);
 res.status(201).json({id:createdCategory.id, name: createdCategory.name}) };

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Update a category
export const updateCategory = async (req, res) => {

const { error } = categorySchema.validate(req.body);
if (error) {
  return res.status(400).json({error: error.details[0].message})};

  try {
    
    const [updated] = await Category.update(req.body, {where: {id: req.params.id}});

    if (updated) {
      return res.status(200).json('Category was updated');
    } else {
    res.status(400).json({error: error.details.message})
    
  } } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Delete a user
export const deleteCategory = async (req, res) => {
  try {
    
    const deletedCategory = await Category.destroy({where: {id: req.params.id}});
    if (deletedCategory) {
     return res.status(200).json({ message: "Category was deleted" });
    } else {}
    res.status(400).json({ error: error.details.message });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong.");
  }
};
