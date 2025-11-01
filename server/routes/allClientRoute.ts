import express from 'express'
import { AllClient } from '../controllers/AllClients'

const router = express.Router();

router.get('/allClientsList' , AllClient);

export default router