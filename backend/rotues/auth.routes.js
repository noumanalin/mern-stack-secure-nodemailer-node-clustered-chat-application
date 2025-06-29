import express from 'express'
import { loginValidations, registerValidations } from '../middleware/express-validator.js';
import { getUser, login, register } from '../controllers/auth.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/register',upload.single('profileImage'), registerValidations, register)
router.post('/login', loginValidations, login)
router.get('/getUser', getUser )

export default router;