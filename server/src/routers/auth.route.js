import { Router } from "express";
import {
  deleteUser,
  forgetPassword,
  getUserDetails,
  getUsers,
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
authRouter.put("/update-details/:id", protectedRoute, updateUserDetails);
authRouter.get("/my-details/:id", protectedRoute, getUserDetails);
authRouter.put("/upload-avatar", upload.single("avatar"), protectedRoute, uploadAvatar)
authRouter.get("/get-all-users", getUsers);
authRouter.patch("/forget-password", forgetPassword);
authRouter.delete("/delete-user", deleteUser);

export default authRouter;
