import User from "../models/user.models.js";
import ErrorHandler from "../utils/errorHadler.js";

export const adminRoute = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      return next(new ErrorHandler("Unauthorized. Please login first.", 401));
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    if (!user.isAdmin) {
      return next(new ErrorHandler("Access denied. Admins only.", 403));
    }

    return next();
  } catch (error) {
    next(error);
  }
};
