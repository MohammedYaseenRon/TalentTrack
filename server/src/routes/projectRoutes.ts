import { Router } from "express";
import { createProject,getProjects,getProjectById } from "../controllers/projectController";
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createProject);
router.get('/',getProjects);
router.get('/:id',getProjectById);  


export default router;