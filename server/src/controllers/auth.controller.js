import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import passport from "passport";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Not Exisits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    await newUser.save();

    return res
      .status(200)
      .json({ newUser, message: "User Registered SuccessFully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "all fields required" });

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) return res.status(400).json({ message: "Invalid user" });

    const isPassword = await bcrypt.compare(password, user.password);
    console.log(isPassword);

    if (!isPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    console.log(token);

    return res.status(200).json({ token, message: "LoggedIn Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const googleLogin = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next)
}

export const googleCallback = async (req, res, next) => {
  try {
    passport.authenticate("google", {failureRedirect: "/login"}, (err, user) => {
      if (err || !user) return res.status(400).json({message: "Authentication Failed"})
  

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      return res.status(200).json({ token, message: "LoggedIn Successfully" });
    })(req, res, next)

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: error.message})
  }
}

export const githubLogin = async (req, res, next) => {
  passport.authenticate('github', { scope: ['user:email']})(req, res, next)
}

export const githubCallback = async (req, res, next) => {
  passport.authenticate('github', {failureRedirect: '/login'}, (err, user) => {
    if (err || !user) return res.status(400).json({message: "Authentication Failed"})
    

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    
    return res.status(200).json({ token, message: "LoggedIn Successfully"})
  })(req, res, next)
}

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const { name, contact, username } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { username, name, contact } },
      { new: true }
    ).select("-password");

    res.status(200).json({
      status: true,
      message: "Profile Updated Successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedFile = req.file;
    console.log(uploadedFile);

    user.avatar = uploadedFile.path;
    await user.save();

    return res.status(200).json({
      message: "File uploaded successfully",
      avatar: uploadedFile.path,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    console.log(user);

    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {

   const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).json({message: "email and password is required"})
    }

    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message: "User not found"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    
    user.password = hashedPassword
    await user.save()

    return res.status(200).json({user: {
      _id: user._id,
      email: user.email
    }, message: "Password updated successfully"})

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password")
    return res.status(200).json({users, message: "All users"})

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

export const deleteUser = async (reqq, res) => {
  try {
  } catch (error) {}
};
