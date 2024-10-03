import Express from "express"
import MedicineRoute from "./router/medicineRouter"
import adminRoute from "./router/adminRouter"
import TransactionRouter from "./router/transactionRouter"

const app = Express()
// allow to read a body reequest with JSON format
app.use(Express.json())
// prefix for medicine route
app.use(`/medicine`, MedicineRoute)
app.use(`/admin`, adminRoute )
app.use(`/transaction`, TransactionRouter)

const PORT = 1992
app.listen(PORT, () => {
    console.log(`Server Drugstore run on port ${PORT}`)
 })