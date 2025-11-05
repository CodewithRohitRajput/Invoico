import express from 'express'
import { sendInvoiceToClient } from "../controllers/nodemailerController";

const router = express.Router();

router.post('/toClient' , sendInvoiceToClient)

export default router;