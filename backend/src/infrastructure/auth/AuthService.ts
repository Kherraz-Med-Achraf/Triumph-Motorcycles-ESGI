import * as jwt from "jsonwebtoken";
import { UserEntity } from "../../domain/entities/UserEntity";

export class AuthService {
  static generateToken(user: UserEntity): string {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "default_secret", 
      { expiresIn: "1h" }
    );
  }
}
