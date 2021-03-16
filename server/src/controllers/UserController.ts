import argon2 from "argon2";
import { Response } from "express";
import {
  loginInputType,
  loginInputValidator,
} from "../validators/loginInputValidator";
import User from "../models/User";
import { ExpressRequest } from "../types";
import {
  registerInputType,
  registerInputValidator,
} from "../validators/registerInputValidator";

class UserController {
  public async register(req: ExpressRequest<registerInputType>, res: Response) {
    const input = req.body;
    if (!input) return res.status(400).json({ errors: ["Provide input"] });
    try {
      await registerInputValidator.validate(input, { abortEarly: false });
      const hashedPass = await argon2.hash(input.password);
      const newUser = new User({
        name: input.name,
        email: input.email,
        password: hashedPass,
      });
      await newUser.save();
      return res.json({
        success: true,
      });
    } catch (e) {
      if (e.errors)
        return res.status(422).json({
          errors: e.errors,
        });
      else if (e.code === 11000)
        return res.status(409).json({ errors: ["Email already exists."] });
      else {
        console.log(e);
        return res.status(500).json({ errors: ["Internal Server Error"] });
      }
    }
  }

  public async login(req: ExpressRequest<loginInputType>, res: Response) {
    const input = req.body;
    try {
      await loginInputValidator.validate(input, { abortEarly: false });
      const user = await User.findOne({ email: input.email });
      if (!user)
        return res.status(422).json({ errors: ["Invalid email or password"] });
      if (!(await argon2.verify(user.password, input.password)))
        return res.status(422).json({ errors: ["Invalid email or password"] });
      req.session.uid = user.id;
      return res.json({
        success: true,
      });
    } catch (e) {
      if (e.errors)
        return res.status(422).json({
          errors: e.errors,
        });
      else {
        console.log(e);
        return res.status(500).json({ errors: ["Internal Server Error"] });
      }
    }
  }
}

export default new UserController();
