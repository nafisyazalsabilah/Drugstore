import { Request, Response } from "express";
import{ PrismaClient } from "@prisma/client";

// create object of prisma
const prisma = new PrismaClient({ errorFormat: "minimal"})
type DrugType = "Syrup" | "Tablet" | "Powder"

const createMedicine = async (req: Request, res: Response) => {
    try {
        const nama: string = req.body.nama
        const stock: number = Number(req.body.stock)
        const exp_date: Date = new Date(req.body.exp_date)
        const price: number = Number(req.body.price)
        const type: DrugType = req.body.type

        // save a new medicine to DB
        const newMedicine = await prisma.medicine.create({
            data: {
                nama, stock, exp_date, price, type
            }
        })
        return(res.status(200)
        .json({
            message: `new medicine has been created`,
            data: newMedicine
        }))
    } catch (error) {
        return res.status(500)
        .json(error)
        
    }
}

const readMedicine = async (
        req: Request, res: Response) => {
    try {
        const search = req.query.search
        // get all medicine
        const allMedicine = await prisma.medicine
        .findMany({
            where: {
                OR:[
                    { nama: {contains: search?.toString() || "" } },
                ]
            }
        })
        return res.status(200)
        .json({
            message: `medicine has been retrieved`,
            data: allMedicine
        })
    } catch (error) {
        res.status(500)
        .json(error)
    }
}

const updateMedicine = async (req: Request, res: Response) => {
    try {
        // membaca "id" obat untuk dikirim ke parameter URL
        const id = req.params.id
        // check exisiting medicine based o id
        const findMedicine = await prisma.medicine
        .findFirst(
            {where: { id: Number(id)}
    })
    
    if(!findMedicine) {
        return res.status(200)
        .json({
            messge: `Medicine is not found`
        })
    }

    // readd a property of medicine from req.body
    const { nama, stock, price, type, exp_date} = req.body

    // update medicine
    const saveMedicine = await prisma.medicine
        .update({
            where: { id: Number(id) },
            data: {
                nama: nama ?? findMedicine.nama,
                stock: stock ? Number(stock) : findMedicine.stock,
                price: price ? Number(price) : findMedicine.price,
                exp_date: exp_date ? new Date (exp_date) : findMedicine.exp_date,
                type: type ? type: findMedicine.type
            }
        })
        return res.status(200)
        .json({
            message: `Medicine has been update`,
            data: saveMedicine
        })
    } catch (error) {
        return res.status(500)
        .json(error)
    }
}

const deleteMedicine = async (req: Request, res: Response) => {
    try {
        //  read of medicine  from request
        const id = req.params.id

        // check existing medicine 
        const findMedicine = await prisma.medicine
            .findFirst({
                where: { id: Number(id) }
            })
        if (!findMedicine) { //! not
            return res.status(200)
                .json({ message: `Medicine is not found` })
        }

        const saveMedicine = await prisma.medicine
            .delete({
                where: { id: Number(id) }
            })
        return res.status(200)
            .json({
                message: `Medicine has been removed`,
                data: saveMedicine
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}
export{ createMedicine, readMedicine, updateMedicine, deleteMedicine } 