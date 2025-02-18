import { Router } from "express";
import { createProject,getProjects,getProjectById } from "../controllers/projectController";
import { authenticateToken } from '../middleware/authMiddleware';
import { upload } from "../controllers/projectController";
const router = Router();

router.post('/', authenticateToken,upload.array("images"), createProject);
router.get('/',getProjects);
router.get('/:id',getProjectById);  

export default router;