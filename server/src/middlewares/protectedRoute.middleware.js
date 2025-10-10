import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import ErrorHandler from "../utils/errorHadler.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer"))
      return res.status(401).json({ message: "Unauthorized access" });

    const token = authHeaders.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.userId);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found. Please log in again.",
      });
    }

    req.user = {
      userId: decode.userId,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


