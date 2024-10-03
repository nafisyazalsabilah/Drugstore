import { Router } from "express";
import { createTransaction, delaeteTransaction, readTransaction, updateTransaction } from "../controller/transactionController";
import { createValidation, updateValidation } from "../middleware/transactionValidation";
import { verifyToken } from "../middleware/authorization";

const router = Router()

router.post(`/`, [verifyToken, createValidation], createTransaction)
router.get(`/`, [verifyToken], readTransaction)
router.put(`/:id`, [verifyToken, updateValidation], updateTransaction)
router.delete(`/:id`, [verifyToken], delaeteTransaction)

export default router