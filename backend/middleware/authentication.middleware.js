import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer <token>"

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
        success: false,
        redirect: "/login", // Optional: for frontend to redirect
      });
    }

    const decoded = jwt.verify(token, "12345abcd"); // Replace with your secret key
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
      success: false,
      redirect: "/login",
    });
  }
};
