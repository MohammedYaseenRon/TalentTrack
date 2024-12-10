// /src/middlewares/roleMiddleware.ts

import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        if(!req.user) {
            return res.status(401).json({error:"User not authenticated"});  
        }

        const { role } = req.user; // The role should be attached from the JWT
        if (roles.includes(role)) {
            return next(); // Allow access
        }
        return res.status(403).json({ error: "Access denied for this role" });
    };
};
