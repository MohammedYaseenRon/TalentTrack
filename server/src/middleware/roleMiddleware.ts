import { Request, Response, NextFunction, RequestHandler } from "express";

export const roleMiddleware = (allowedRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.role) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    if (!allowedRoles.includes(req.user.role.toUpperCase())) {
        console.log("Role middleware - Access denied for role:", req.user.role);
        res.status(403).json({ error: "Access denied for this role" });
      return;
    }

    next();
  };
};

