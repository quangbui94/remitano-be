import { Request, Response } from "express";
import AuthService from "../services/AuthServices";

abstract class IAuthController {
  login(): void {}
}

export default class AuthController extends IAuthController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await AuthService.login({ email, password });

      if (token) {
        res.status(200).send({ token, email });
        return;
      }
      res.status(401).send("Authentication failed");
    } catch (error: any) {
      console.log(error);
      res.status(401).send(error.message);
    }
  }
}