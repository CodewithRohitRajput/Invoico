import express from 'express'
const router = express.Router();
import { forgotPassword , ResetPassword } from '../controllers/resetPassController';

router.post('/reset-password' , ResetPassword)
router.post('/forgotPassword' , forgotPassword);

export default router;