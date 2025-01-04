import { Router } from "express";
import { createApplication,updateApplicationStatus,getAllApplication,getUserApplication } from "../controllers/applicationController";   

const router = Router();

router.post('/', createApplication);
router.get('/job/:jobId',   getAllApplication);
router.get('/user/:userId',  getUserApplication)
router.patch('/:id/status', updateApplicationStatus);


export default router;