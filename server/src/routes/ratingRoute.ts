import { Router } from "express";
import { createRating,getRatingByProject,updateRating } from "../controllers/ratingController";

const router = Router();

router.get('/:projectId/rating', getRatingByProject);
router.post('/',  createRating);
router.put('/:commentId',  updateRating)


export default router;