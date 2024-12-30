import { Router } from "express";
import { createJob,getJobs } from "../controllers/jobController";
import { authenticateToken } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
const router = Router();

router.post('/', authenticateToken, roleMiddleware(['RECRUITER']), createJob);
router.get('/',getJobs);

export default router;