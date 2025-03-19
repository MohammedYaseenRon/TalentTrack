import { Router } from "express";
import { createTask,getTask,getTaskById,getTaskSubmission,taskSubmission } from "../controllers/taskController";
import { authenticateToken } from "../middleware/authMiddleware";
import { upload } from "../controllers/projectController";
const router = Router();


//Routes for creating task
router.post('/', authenticateToken,upload.array("taskImage"), createTask);
router.get('/',getTask);
router.get('/:taskId', getTaskById);


//Routes for taskSubmission
router.post("/:taskId/submit",authenticateToken, taskSubmission);
router.get("/:taskId/submissions",  getTaskSubmission)

export default router;


