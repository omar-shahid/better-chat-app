import { Request, Response } from "express";

class UserController {
  public login(_: Request, res: Response) {
    res.json({ f: "sdfk" });
  }
}

export default new UserController();
