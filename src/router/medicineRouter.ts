import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/medicineValidation";
import { uploadMedicinePhoto } from "../middleware/uploadMedicinePhoto";
const router = Router()

// membuat router untuk menambahkan data obat baru
// single = file yg diupload 1
router.post(`/`, [uploadMedicinePhoto.single(`photo`), createValidation,] ,createMedicine)

// route for show all medicine
router.get(`/`, readMedicine)
// route for update medicine
router.put(`/:id`,[uploadMedicinePhoto.single(`photo`), updateValidation ], updateMedicine)
// route for remove
router.delete(`/:id`, deleteMedicine)
export default router 