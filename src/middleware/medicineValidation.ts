import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import router from "../router/medicineRouter"
import path from "path"
import { ROOT_DIRECTORY } from "../config"
import fs from "fs"

// create a rule/schema for add new medicine
const createSchema = Joi.object({
    nama: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(1).required(),
    exp_date: Joi.date().required(),
    type: Joi.string().valid("Syrup", "Tablet", "Powder").required()
})

const createValidation = (
    req: Request, res: Response, next: NextFunction) => {
    const validate = createSchema.validate(req.body)
    if (validate.error) {
        // delete current uploaded file
        let filename: string = req.file?.filename || ``
        let pathFile = path.join(ROOT_DIRECTORY, "public","medicine-photo", filename)
        // check is file exists
        let fileExists = fs.existsSync(pathFile)
        
        if(fileExists && filename !==``){
            // delete file
            fs.unlinkSync(pathFile)
        }
        return res.status(400).json({
            message: validate.error.details.map(it => it.message).join()
        })
    }
    return next()
}

// shcema update validation
const updateSchema = Joi.object({
    nama: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    price: Joi.number().min(1).optional(),
    exp_date: Joi.date().optional(),
    type: Joi.string().valid("Syrup", "Tablet", "Powder").optional()
})

const updateValidation = (
    req: Request, res: Response, next: NextFunction) => {
    const validate = createSchema.validate(req.body)
    if (validate.error) {
         // delete current uploaded file
         let filename: string = req.file?.filename || ``
         let pathFile = path.join(ROOT_DIRECTORY, "public","medicine-photo", filename)
         // check is file exists
         let fileExists = fs.existsSync(pathFile)
         
         if(fileExists && filename !==``){
             // delete file
             fs.unlinkSync(pathFile)
         }
        return res.status(400).json({
            message: validate.error.details.map(it => it.message).join()
        })
    }
    next()
}


export { createValidation, updateValidation }