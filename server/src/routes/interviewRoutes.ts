import { Router } from "express";
import { getSlot,createSlot,scheduleInterview } from "../controllers/interviewController";



const router = Router();

router.post('/',scheduleInterview);
router.get('/',createSlot);
router.get('/slots',getSlot);

export default router;
