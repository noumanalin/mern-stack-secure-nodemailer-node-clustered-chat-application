import express from 'express'
import { loginValidations, registerValidations } from '../middleware/express-validator.js';
import { login, register } from '../controllers/auth.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/register',upload.single('profileImage'), registerValidations, register)
router.post('/login', loginValidations, login)


export default router;