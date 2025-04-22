import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import ApiError from "../exceptions/api-error";
import { Errors } from "../exceptions/errors";

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body;
      const userInfo = await UserService.register(email, password, username);

      res
        .cookie("refreshToken", userInfo.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .json(userInfo);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username, password } = req.body;

      const identifier = email ?? username;

      const userInfo = await UserService.login(identifier, password);

      res
        .cookie("refreshToken", userInfo.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .json(userInfo);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        throw new ApiError(Errors.Unauthorized);
      }

      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logged out" });
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refreshToken;

      const accessToken = await UserService.refresh(token);

      res.json({ accessToken });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
