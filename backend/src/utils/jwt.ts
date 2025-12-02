import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "change-me";

export const signToken = (payload: object, expiresIn = "7d") =>
  jwt.sign(payload, SECRET, { expiresIn });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET) as any;