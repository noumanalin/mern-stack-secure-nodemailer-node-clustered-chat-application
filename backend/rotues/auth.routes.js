import express from 'express'
import { registerValidations } from '../middleware/express-validator.js';
import { register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerValidations, register)


export default router;