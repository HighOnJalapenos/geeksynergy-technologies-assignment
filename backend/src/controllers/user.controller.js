import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, profession } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      phone,
      profession,
    });
    const user = await newUser.save();
    const userCreated = await User.findById(user._id).select("-password");
    res
      .status(201)
      .json({ message: "User registered successfully", userCreated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNo, profession, email } = req.body;
    await User.findByIdAndUpdate(id, { name, phoneNo, profession, email });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  registerUser,
  loginUser,
  listUsers,
  deleteUser,
  updateUser,
  singleUser,
};
