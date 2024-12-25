import { Router } from "express";
import { createComment,updateComment,getCommentsByProject } from "../controllers/commentController";   

const router = Router();

router.get('/:projectId/comments', getCommentsByProject);
router.post('/',  createComment);
router.put('/:commentId',  updateComment)


export default router;