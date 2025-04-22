import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

const accessSecret = process.env.JWT_ACCESS_SECRET || "";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "";

class TokenService {
  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, refreshSecret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, accessSecret);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
