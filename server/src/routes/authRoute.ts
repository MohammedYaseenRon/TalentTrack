import { Router } from 'express';
import { signup,login } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';  // Import the JWT middleware
import { roleMiddleware } from '../middleware/roleMiddleware';


const router = Router();

router.post('/signup', signup);
router.post('/login', login);

// router.post('/create-job', authenticateJWT, roleMiddleware(['RECRUITER']), (req, res) => {
//     res.status(200).json({ message: "Job created successfully" });
// });

export default router;  