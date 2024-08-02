import { User } from "../db/associations.js";
import { userSchema } from "../schemas/userSchema.js";


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password','createdAt', 'updatedAt'] }});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id,{
      attributes: { exclude: ['password','createdAt', 'updatedAt'] }});
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Create a new user
export const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if ( error ) {
    return res.status(400).json({error: error.details[0].message})
  }
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      id: user.id, username: user.name, email: user.email});
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Update a user
export const updateUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if ( error ) {
    return res.status(400).json({error: error.details[0].message})
  }

  try { 
    const [updated] = await User.update(req.body, {where: {id: req.params.id}});

    if (updated) {
    const updatedUser = await User.findByPk(req.params.id,)
    res.status(200).json(updatedUser);
    } else {
      res.status(200).json({message: 'User not found'});
      
  }} catch (error) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
};

// Delete a user
export const deleteUser = async (req, res) => {

  try {
    const deletedUser = await User.destroy({where: {id: req.params.id}});
    

    if (deletedUser) {  
      res.status(204).json({message: 'User not found'})
    }
    else { 
      res.status(404).json({error: 'User not found'})
    };
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }};
