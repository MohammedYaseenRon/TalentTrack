import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { getUserProject,updateProfile,deleteProject,getUserProfile } from "../controllers/userController";
const router = Router();

router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile", authenticateToken, updateProfile);
router.get("/projects", authenticateToken, getUserProject);
router.delete("/projects/:id", authenticateToken, deleteProject);

export default router;