import express from "express";
import UserController from "../controllers/user.controller";
import validateInput from "../middlewares/validation-middleware";
import registerSchema from "../validation/registerSchema";
import { loginSchema } from "../validation/loginSchema";
import authMiddleware from "../middlewares/auth.middleware";

const UserRouter = express.Router();

UserRouter.post(
  "/register",
  validateInput(registerSchema),
  UserController.register
);
UserRouter.post("/login", validateInput(loginSchema), UserController.login);
UserRouter.post('/logout', authMiddleware, UserController.logout);
UserRouter.post('/refresh', authMiddleware, UserController.refreshToken);

export default UserRouter;
