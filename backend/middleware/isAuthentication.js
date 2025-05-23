import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
        success: false,
        redirect: "/login",
      });
    }

    const decoded = jwt.verify(token, "12345abc");

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
      success: false,
      redirect: "/login",
    });
  }
};
