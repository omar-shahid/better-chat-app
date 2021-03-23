import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.qid)
    return res.status(401).json({ errors: ["Un Authorized"] });

  return next();
};
