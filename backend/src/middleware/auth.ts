import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../prisma";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
  const token = auth.split(" ")[1];
  try {
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: (payload as any).id } });
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(403).json({ error: "Not authenticated" });
  if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
  next();
};