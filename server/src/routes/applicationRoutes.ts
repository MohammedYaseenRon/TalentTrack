import { Router } from "express";
import { createApplication,updateApplicationStatus,getAllApplication,getUserApplication } from "../controllers/applicationController";   
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post('/',authenticateToken, createApplication);
router.get('/job/:jobId',   getAllApplication);
// router.get('/:applicationId',   getApplicationDetails);
router.get('/user/:userId',  getUserApplication)
router.patch('/:id/status', updateApplicationStatus);


export default router;