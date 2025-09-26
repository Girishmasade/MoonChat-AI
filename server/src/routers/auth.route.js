import { Router } from "express";
import {
  deleteUser,
  forgetPassword,
  getUserDetails,
  getUsers,
  login,
  register,
  updateUserDetails,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.put("/update-details", updateUserDetails);
authRouter.get("/my-details", getUserDetails);
authRouter.get("/get-all-users", getUsers);
authRouter.patch("/forget-password", forgetPassword);
authRouter.delete("/delete-user", deleteUser);

export default authRouter;
