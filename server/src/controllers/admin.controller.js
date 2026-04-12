import User from "../models/user.models.js";
import SuccessHandler from "../utils/successHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/errorHadler.js";
import { jwt_exp, jwt_secret } from "../env/envImportFile.js";

// Admin Register API

export const adminRegister = async (req, res, next) => {
  try {
    const { username, email, password, secretKey } = req.body;
    if (!username || !email || !password || !secretKey)
      return next(new ErrorHandler("All fields are required", 400));

    if (secretKey !== secretKey)
      return next(new ErrorHandler("Invalid secret key", 400));

    const existingUser = await User.findOne({ email });

    if (existingUser) return next(new ErrorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await newUser.save();

    return res.status(200).json(
      new SuccessHandler(200, "Admin Registered Successfully", {
        user: newUser,
      }),
    );
  } catch (error) {
    next(error);
  }
};

// Admin Login API

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("All fields are required", 400));

    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("User not found", 404));

    if (!user.isAdmin)
      return next(new ErrorHandler("Access denied. Admins only.", 403));

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return next(new ErrorHandler("Invalid email or password", 400));

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      jwt_secret,
      { expiresIn: jwt_exp },
    );

    const adminData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    await user.save();

    return res.status(200).json(
      new SuccessHandler(200, "Admin LoggedIn Successfully", {
        token,
        user: adminData,
      }),
    );
  } catch (error) {
    next(error);
  }
};

// Admin Profile API

export const adminProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findOne({ userId, isAdmin: true }).select(
      "-password -googleId -githubId -contacts",
    );

    if (!user) return next(new ErrorHandler("User not found", 404));

    return res.status(200).json(
      new SuccessHandler(200, "Admin Profile", {
        user,
      }),
    );
  } catch (error) {
    next(error);
  }
};

// Update Admin Profile API

export const updateAdminProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const updateAdminProfile = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select(
      "-password -googleId -githubId -contacts",
    );

    if (!updateAdminProfile)
      return next(new ErrorHandler("User not found", 404));

    return res.status(200).json(
      new SuccessHandler(200, "Admin Profile Updated Successfully", {
        user: updateAdminProfile,
      }),
    );
  } catch (error) {
    next(error);
  }
};
