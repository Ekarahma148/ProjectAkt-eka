import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import {
  addTransaction,
  getAllTransactions,
  editTransaction,
  removeTransaction
} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', verifyToken, getAllTransactions);
router.post('/', verifyToken, addTransaction);
router.put('/:id', verifyToken, editTransaction);
router.delete('/:id', verifyToken, removeTransaction);

export default router;
