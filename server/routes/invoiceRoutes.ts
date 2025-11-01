import express from 'express'
import { InvoiceCreate } from '../controllers/InvoiceController';
const router = express.Router()

router.post('/create-invoice' , InvoiceCreate);

export default router;