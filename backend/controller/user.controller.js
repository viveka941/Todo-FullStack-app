import bcrypt from "bcryptjs";
import { User } from "../model/user.model.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone  ) {
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

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Required fields are missing",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
        success: false,
      });
    }

    // Generate JWT
    const tokenData = {
      userId: existingUser._id,
    };

    const token = jwt.sign(tokenData, "12345abc", {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: "Successfully logged in",
        success: true,
        user: {
          id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
        },
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server error during login",
      success: false,
      error: error.message,
    });
  }
};

export const loginById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findById(id); // ✅ Pass `id` directly

    if (!data) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Login by ID successful",
      success: true,
      user: data,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server error during login by ID",
      success: false,
      error: error.message,
    });
  }
};

// Logout Controller
export const logout = (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      message: "Server error during logout",
      success: false,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, address } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

  
    let updatedPassword = existingUser.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name || existingUser.name,
        email: email || existingUser.email,
        password: updatedPassword,
        phone: phone || existingUser.phone,
        address: address || existingUser.address,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      profile: updatedUser
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "Server error during profile update",
      success: false,
      error: error.message,
    });
  }
};



export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required for verification",
        success: false,
      });
    }

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (
      existingUser.name.trim().toLowerCase() !== username.trim().toLowerCase()
    ) {
      return res.status(403).json({
        message: "Invalid username",
        success: false,
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Profile deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Delete Profile Error:", error);
    return res.status(500).json({
      message: "Server error while deleting profile",
      success: false,
      error: error.message,
    });
  }
};


export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).json({
      message: "Successfully fetched users",
      users: allUser,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};
