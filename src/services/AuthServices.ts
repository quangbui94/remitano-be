import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface AuthRequestData {
  email: string;
  password: string;
}

abstract class IAuthService {
  login(item: AuthRequestData): any {}
}

export default class AuthService extends IAuthService {
  public static async login(item: AuthRequestData) {
    const { email, password } = item;

    if (!password || !email) {
      console.log("Missing password or username");
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
        console.log("Wrong username or password");
        return;
      }

      const token = await jwt.sign({ email }, "secret");
      return token;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
