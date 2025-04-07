import express from 'express';
import { registerUser, loginUser, getCurrentUser, logoutUser } from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, getCurrentUser);
router.post('/logout', logoutUser);
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout berhasil' });
  });
export default router;
