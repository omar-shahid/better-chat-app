import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExpressRequest } from "../types";

export const isAuthenticated = (
  req: ExpressRequest<{ token: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedDecodedToken = jwt.verify(
      req.headers["authorization"]?.slice("Bearer ".length) ?? "",
      process.env.JWT_SECRET ?? ""
    );
    if (!verifiedDecodedToken)
      return res.status(401).json({ errors: ["Un Authorized"] });

    req.decodedToken = verifiedDecodedToken as any;
    return next();
  } catch (e) {
    return res
      .status(401)
      .json({ errors: ["Un Authorized or token not provided"] });
  }
};

export const isSocketAuthenticated = (token: string, socket: Socket) => {
  jwt.verify(token, process.env.JWT_SECRET ?? "");
  if (!token) socket.emit("auth:notLoggedIn");
  return;
};
