import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ExpressRequest } from "../types";

export const isAuthenticated = (
  req: ExpressRequest<{ token: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !jwt.verify(
        req.headers["authorization"]?.slice("Bearer ".length) ?? "",
        process.env.JWT_SECRET ?? ""
      )
    )
      return res.status(401).json({ errors: ["Un Authorized"] });

    return next();
  } catch (e) {
    return res
      .status(401)
      .json({ errors: ["Un Authorized or token not provided"] });
  }
};
