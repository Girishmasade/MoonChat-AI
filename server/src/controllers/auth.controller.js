import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import passport from "passport";
import ErrorHandler from "../utils/errorHadler.js";
import SuccessHandler from "../utils/successHandler.js";

// Admin Registration and Login (for testing purpose only, can be removed later)

export const adminRegister = async (req, res, next) => {
  try {
    const { username, email, password, name, secretKey } = req.body;
    if (!username || !email || !password || !secretKey)
      return next(new ErrorHandler("All fields are required", 400));

    if (secretKey !== process.env.SECRET_KEY)
      return next(new ErrorHandler("Invalid secret key", 400));

    const existingUser = await User.findOne({ email });

    if (existingUser) return next(new ErrorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      name,
      password: hashedPassword,
      isAdmin: true,
    });

    await newUser.save();

    return res.status(200).json(
      new SuccessHandler(200, "Admin Registered Successfully", {
        user: newUser,
      })
    );
  } catch (error) {
    next(error);
  }
};

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
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
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
      })
    );
  } catch (error) {
    next(error);
  }
};

// User Registration and Login

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return next(new ErrorHandler("All fields are required", 400));

    const existingUser = await User.findOne({ email });

    if (existingUser) return next(new ErrorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // console.log(newUser);

    await newUser.save();

    return res
      .status(200)
      .json(new SuccessHandler(200, "Registered Successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("All fields are required", 400));

    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) return next(new ErrorHandler("User not found", 404));

    const isPassword = await bcrypt.compare(password, user.password);
    // console.log(isPassword);

    if (!isPassword)
      return next(new ErrorHandler("Invalid email or password", 400));

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    // console.log(token);

    return res.status(200).json(
      new SuccessHandler(200, "LoggedIn Successfully", {
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

// Google OAuth google login and callback

export const googleLogin = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res, next);
};

export const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/signin" },
    (err, user) => {
      if (err || !user) return res.redirect("/signin");

      // Generate JWT
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.redirect(
        `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
      );
    }

  )(req, res, next);
};
// GitHub OAuth github login and callback

export const githubLogin = async (req, res, next) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
};

export const githubCallback = async (req, res, next) => {
  passport.authenticate(
    "github",
    { failureRedirect: "/signin" },
    (err, user) => {
      if (err || !user)
        return next(new ErrorHandler("Authentication Failed", 400));

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      return res.redirect(
        `${process.env.FRONTEND_URL}oauth-success?token=${token}`
      );
    }
  )(req, res, next);
};

// Update User Details

export const updateUserDetails = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    if (!userId) return next(new ErrorHandler("Unauthorized", 401));

    const { name, lastname, contact, username } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { username, name, contact, lastname } },
      { new: true, runValidators: true }
    ).select("-password");

    // res.status(200).json({
    //   status: true,
    //   message: "Profile Updated Successfully.",
    //   user,
    // });
    return res
      .status(200)
      .json(
        new SuccessHandler(200, "Profile Updated Successfully.", { data: user })
      );
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    const user = await User.findById(userId);
    // console.log(user);
    if (!user) return next(new ErrorHandler("User not found", 404));

    if (!req.file) return next(new ErrorHandler("File not found", 404));

    const uploadedFile = req.file;
    // console.log(uploadedFile);

    user.avatar = uploadedFile.path;
    await user.save();

    return res.status(200).json(
      new SuccessHandler(200, "Avatar uploaded successfully", {
        avatar: user.avatar,
      })
    );
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) return next(new ErrorHandler("User not found", 404));

    res
      .status(200)
      .json(
        new SuccessHandler(200, "User details fetched successfully", { user })
      );
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
      },
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ users, message: "All users" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    return res
      .status(200)
      .json(new SuccessHandler(200, "User deleted successfully"));
  } catch (error) {
    next(error);
  }
};
