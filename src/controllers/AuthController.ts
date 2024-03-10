import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthServices";

abstract class IAuthController {
  login(): void {}
}

export default class AuthController extends IAuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const token = await AuthService.login({ email, password });

      if (token) {
        res.status(200).send({ token, email });
        return;
      }
      res.status(401).send("Authentication failed");
    } catch (error: any) {
      next(error)
    }
  }
}