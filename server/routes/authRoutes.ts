import express from 'express'
import {registerUser , loginUser , profile} from '../controllers/authController'
const router = express.Router();


router.post('/register' , registerUser)
router.post('/login', loginUser);
router.get('/profile' , profile)

export default router;