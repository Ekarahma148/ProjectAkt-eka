// backend/routes/projectRoutes.js
import express from 'express';
import {
  handleCreateProject,
  handleGetProjects,
  handleDeleteProject,
} from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, handleCreateProject);
router.get('/', verifyToken, handleGetProjects);
router.delete('/:id', verifyToken, handleDeleteProject);

export default router;
