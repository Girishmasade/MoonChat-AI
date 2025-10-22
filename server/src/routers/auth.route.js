import { Router } from "express";
import {
  adminLogin,
  adminRegister,
  deleteUser,
  forgetPassword,
  getUserDetails,
  getUsers,
  githubCallback,
  githubLogin,
  googleCallback,
  googleLogin,
  login,
  register,
  updateUserDetails,
  uploadAvatar,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { googleProtectedRoute } from "../middlewares/google.middleware.js";

const authRouter = Router();

// admin routes

authRouter.post("/admin/register", adminRegister);
authRouter.post("/admin/signin", adminLogin)
// Public Routes

authRouter.post("/signup", register);
authRouter.post("/signin", login);

// google login routes

authRouter.get("/google", googleLogin)
authRouter.get("/google/callback", googleCallback)

// github login routes
authRouter.get("/github", githubLogin)
authRouter.get("/github/callback", githubCallback)

authRouter.put("/update-details", protectedRoute, updateUserDetails);
authRouter.get("/profile", protectedRoute, getUserDetails);
authRouter.post("/upload-avatar", upload.single("avatar"), protectedRoute, uploadAvatar)

// admin routes
authRouter.get("/get-all-users", getUsers);
authRouter.patch("/forget-password/:id", forgetPassword);
authRouter.delete("/delete-user", deleteUser);

export default authRouter;
