import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).json({
            success: false,
            errors: errorMessages,
            message: "Kindly fulfill all requirements"
        });
    }

    try {
        const { userName, email, password } = req.body;
        const existingUser = await User.findOne({
            $or: [{ userName }, { email }]
        });

        if (existingUser) {
            const errors = [];
            if (existingUser.userName === userName) {
                errors.push(`Username '${userName}' is already taken.`);
            }
            if (existingUser.email === email) {
                errors.push(`Email '${email}' is already registered.`);
            }
            
            return res.status(400).json({
                success: false,
                errors: errors,
                message: "Duplicate user information found"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            userName,
            email,
            password: hashedPassword
        });

        return res.status(200).json({
            success: true,
            message: "Registration done successfully 🎉"
        });

    } catch (error) {
        console.error(`❌ Auth register error: ${error}`);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};