import { Product , Category }  from "../db/associations.js"
import { productSchema } from "../schemas/productSchema.js";



// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll(
      {attributes: { exclude: ['password','createdAt', 'updatedAt'] }},
      {where: req.query.categoryId ? {categoryId: req.query.categoryId} : { }}

    );
      
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};
// Get a products by ID
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found ");
    } else {
    res.status(200).json({
      id:product.id, 
      name:product.name,
      description:product.description,
      price:product.price,
      categoryId:product.categoryId,
      message:'Succesfully got the Product'});}
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Create a new product
export const createProduct = async (req, res) => {

const { error } = productSchema.validate(req.body);
if (error) {
return res.status(400).json(error)
} 
  try {
    const categoryExists = await Category.findByPk(req.body.categoryId);
    if (!categoryExists) {
    res.status(400).json({error:'category doesnt exist'})
  };
  const product = await Product.create(req.body);
  res.status(201).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};


// Update a category
export const updateProduct = async (req, res) => {


const { error } = productSchema.validate(req.body);
if(error) {
  res.status(400).json({error: error.message})
}



  try {
    const [updated] = await Product.update(req.body, {where: {id: req.params.id} })

if (updated > 0) {
  const updatedProduct =  await Product.findByPk(req.params.id);
  return res.status(200).json({
    name:updatedProduct.name, 
    description: updatedProduct.description, 
    price: updatedProduct.price, 
    categoryId:updatedProduct.categoryId,
  message: 'Product was successfully updated'}
  );

} else {
  return res.status(404).json({error: error.message});
}
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: error.message});
  }
};
// Delete a user
export const deleteProduct = async (req, res) => {
  try {
    
const { error } = productSchema.validate(req.body);
  if (error) {
res.status(400).json({error: error.message})
  }

const deleted = await Product.destroy({where:{id: req.params.id}});
if (deleted) {
  res.status(200).json({message: 'Succesfully deleted'});
} 
} catch (error) {
  console.error(error);
  res.status(500).send("Something went wrong.");
}};
