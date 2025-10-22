import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHadler.js";
import User from "../models/user.models.js";

export const googleProtectedRoute = async (req, res, next) => {
  try {
    const authHeaders = req.headers.autharization;

    if (!authHeaders || !authHeaders.startsWith("Bearer")) {
      return next(new ErrorHandler("Unautharized access", 401));
    }

    const token = authHeaders.split[""];
    if (!token) {
      return next(new ErrorHandler("Unautharized access", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findById(decode.userId).select("-password");

    if (!user) {
      return next(
        new ErrorHandler("User not found. Please log in again.", 401)
      );
    }

    req.user = {
      googleId: user.googleId || null,
      githubId: user.githubId || null,
    };

    next();
  } catch (error) {
    next(error);
  }
};
