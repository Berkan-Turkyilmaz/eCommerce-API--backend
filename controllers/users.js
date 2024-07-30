import Users from "../models/user.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
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
    const user = await Users.findByPk(id);
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
  try {
    const {
      body: { name, email, password },
    } = req;
    const user = await Users.create(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Update a user
export const updateUser = async (req, res) => {
  try {
    const {
      body: { name, email, password },
      params: { id },
    } = req;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
