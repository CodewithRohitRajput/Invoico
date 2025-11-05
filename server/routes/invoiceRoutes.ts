import express from 'express'
import { getInvoice, InvoiceCreate } from '../controllers/InvoiceController';
const router = express.Router()

router.post('/create-invoice' , InvoiceCreate);
router.get('/get-invoice' , getInvoice )

export default router;