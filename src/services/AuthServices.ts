import User from "models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequest } from "shared/ErrorCustom";

interface AuthRequestData {
  email: string;
  password: string;
}

abstract class IAuthService {
  login(item: AuthRequestData): any { }
}

export default class AuthService extends IAuthService {
  public static async login(item: AuthRequestData) {
    const { email, password } = item;

    if (!password || !email) {
      throw new BadRequest('Missing credentials!');
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        // Signup flow
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        await user.save();

        const token = await jwt.sign({ email }, "secret");
        return token;
      }
      //Login flow
      const validatePassword = await bcrypt.compare(password, user!.password);

      if (!validatePassword) {
        throw new BadRequest('Invalid credentials!');
      }

      const token = await jwt.sign({ email }, "secret");
      return token;
    } catch (error) {
      throw error;
    }
  }
}
