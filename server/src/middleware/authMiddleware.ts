import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the structure of the decoded JWT payload
interface UserJwtPayload {
  userId: string;
  role: string;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Authentication token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserJwtPayload;
    req.user = decoded;  // Attach the decoded user information to req.user
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
