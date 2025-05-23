import bcrypt from 'bcryptjs'
import { User } from "../model/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

   
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({
        message: "Required fields are missing",
        success: false,
      });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashPassword =await bcrypt.hash(password,10)

    const newUser = await User.create({
      name,
      email,
      password : hashPassword,
      phone,
      address,
    });

    

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Server error during registration",
      success: false,
      error: error.message,
    });
  }
};
