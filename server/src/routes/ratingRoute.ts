import { Router } from "express";
import { createRating,getRatingByProject,getUserRatings,updateRating } from "../controllers/ratingController";

const router = Router();

router.get('/:projectId', getRatingByProject);
router.post('/',  createRating);
router.put('/:commentId',  updateRating)
router.get("/", getUserRatings);

export default router;