import express from 'express';
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
} from '../controllers/transactionController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/transactions', verifyToken, getTransactions);
router.get('/transactions/:id', verifyToken, getTransactionById);
router.post('/transactions', verifyToken, createTransaction);
router.put('/transactions/:id', verifyToken, updateTransaction);
router.delete('/transactions/:id', verifyToken, deleteTransaction);

export default router;
