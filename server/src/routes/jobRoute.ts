import { Router } from "express";
import { createJob,getJobs,deleteJobs } from "../controllers/jobController";
import { authenticateToken } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
const router = Router();

router.post('/', authenticateToken, roleMiddleware(['RECRUITER']), createJob);
router.get('/',getJobs);
router.get('/:id',getJobs); 
router.delete('/:id',deleteJobs); 


export default router;