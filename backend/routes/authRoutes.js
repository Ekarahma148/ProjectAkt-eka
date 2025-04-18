import express from 'express';
import { login, register, logout, checkAuth } from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken,checkAuth);
router.post('/logout', logout);

export default router;
