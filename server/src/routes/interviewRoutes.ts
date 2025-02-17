import { Router } from "express";
import { getSlot,createSlot,scheduleInterview } from "../controllers/interviewController";
import { authenticateToken } from "../middleware/authMiddleware";



const router = Router();

router.post('/schedule',scheduleInterview);
router.post('/slots', authenticateToken, createSlot);
router.get('/slots',getSlot);

export default router;
