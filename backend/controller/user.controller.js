import { User } from "../model/user.model.js";

// Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone) {
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

    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
      },
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

// Login Controller
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

    if (password !== existingUser.password) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    return res.status(200).json({
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

// Login by ID
export const loginById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Login by ID successful",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Login by ID Error:", error);
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
    return res.status(200).json({
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

// Update Profile Controller
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

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name || existingUser.name,
        email: email || existingUser.email,
        password: password || existingUser.password,
        phone: phone || existingUser.phone,
        address: address || existingUser.address,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      profile: updatedUser,
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

// Delete Profile Controller
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

// Get All Users
export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find().select("-password");

    return res.status(200).json({
      message: "Successfully fetched users",
      success: true,
      users: allUser,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Error fetching users",
      success: false,
      error: error.message,
    });
  }
};
