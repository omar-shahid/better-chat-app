import jwt from "jsonwebtoken";
export const createToken = (data: Record<string, any>) => {
  return jwt.sign(data, process.env.JWT_SECRET ?? "");
};
