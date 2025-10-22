import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(401).json({ message: "Unauthorized access" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decode.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = {
      userId: user._id,
      googleId: user.googleId || null,
      githubId: user.githubId || null,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    };

    next();
  } catch (error) {
    console.error("Protected route error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
