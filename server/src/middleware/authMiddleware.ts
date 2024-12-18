/// <reference path="../types/custom.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface UserJwtPayload {
  userId: number;
  role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Authentication token required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserJwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role }; 
  } catch (error) {
    res.status(403).json({ error: "Forbidden: Invalid token" });
    return;
  }
};