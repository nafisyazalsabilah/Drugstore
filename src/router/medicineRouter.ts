import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation } from "../middleware/medicineValidation";
const router = Router()

// membuat router untuk menambahkan data obat baru
router.post(`/`, [createValidation] ,createMedicine)

// route for show all medicine
router.get(`/`, readMedicine)
// route for update medicine
router.put(`/:id`, [updateMedicine], updateMedicine)
// route for remove
router.delete(`/:id`, deleteMedicine)
export default router 