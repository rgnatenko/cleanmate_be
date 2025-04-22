import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import ApiError from "../exceptions/api-error";
import { Errors } from "../exceptions/errors";
import successAuthResponse from "../utils/successAuthResponse";
import jwt from "jsonwebtoken";
import UserDto from "../dtos/user.dto";

class UserService {
  async register(email: string, password: string, username: string) {
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      throw new ApiError(Errors.AlreadyExists);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return successAuthResponse(user);
  }

  async login(identifier: string, password: string) {
    if (!identifier) {
      throw new ApiError(Errors.EnterEmailOrUsername);
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      throw new ApiError(Errors.UserNotFound);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(Errors.WrongPassword);
    }

    return successAuthResponse(user);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new ApiError(Errors.Unauthorized);
    }

    let userData;
    try {
      userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new ApiError(Errors.IncorrectToken);
    }

    const user = await User.findById((userData as UserDto).id);
    if (!user) {
      throw new ApiError(Errors.Unauthorized);
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    return accessToken;
  }

  async getUserById(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(Errors.UserNotFound);
    }

    return user;
  }
}

export default new UserService();
