import express from 'express'
import { client , getClients } from '../controllers/clientController'
const router = express.Router();

router.post('/create' , client)
router.get('/get' , getClients)


export default router