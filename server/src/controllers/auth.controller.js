import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Not Exisits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    console.log(newUser);

    await newUser.save();

    return res
      .status(200)
      .json({ newUser, message: "User Registered SuccessFully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({message: "all fields required"});

    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) return res.status(400).json({message: "Invalid user"});

    const isPassword = await bcrypt.compare(password, user.password);
    console.log(isPassword);
    
    if (!isPassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    console.log(token);

    return res.status(200).json({token, message: "LoggedIn Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
  } catch (error) {}
};

export const getUserDetails = async (req, res) => {
  try {
  } catch (error) {}
};

export const getUsers = async (req, res) => {
  try {
  } catch (error) {}
};

export const forgetPassword = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteUser = async (reqq, res) => {
  try {
  } catch (error) {}
};
