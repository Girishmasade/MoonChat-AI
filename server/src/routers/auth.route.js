import { Router } from "express";
import {
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

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

// google login routes

authRouter.get("/google", googleLogin)
authRouter.get("/google/callback", googleCallback)

// github login routes
authRouter.get("/github", githubLogin)
authRouter.get("/github/callback", githubCallback)

authRouter.put("/update-details/:id", protectedRoute, updateUserDetails);
authRouter.get("/profile/:id", protectedRoute, getUserDetails);
authRouter.put("/upload-avatar", upload.single("avatar"), protectedRoute, uploadAvatar)
authRouter.get("/get-all-users", getUsers);
authRouter.patch("/forget-password/:id", forgetPassword);
authRouter.delete("/delete-user", deleteUser);

export default authRouter;
