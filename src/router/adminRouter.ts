import { Router } from "express";
import { authentication, createAdmin, deleteAdmin, readAdmin, updateAdmin } from "../controller/adminController";
import { authValidation, createValidation, updateValidation } from "../middleware/adminValidation";

const router = Router()
router.post(`/`,[createValidation], createAdmin)
router.get (`/`,readAdmin)
router.put(`/:id`,[updateValidation] , updateAdmin)
router.delete( `/:id`,deleteAdmin )
router.post(`/auth`, [authValidation], authentication)

export default router 