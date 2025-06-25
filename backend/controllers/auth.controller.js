import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import sharp from 'sharp';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'

import { User } from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { sendEmail } from "../lib/nodeMailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
        const { userName, email, password, gender } = req.body;
        const profileImage = req.file;

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

        let profileImageUrl = "";

        if (profileImage) {
            if (profileImage.size > 2 * 1024 * 1024) {
                return res.status(400).json({
                    success: false,
                    message: "Image size should be less than 2MB"
                });
            }

            const optimizedImageBuffer = await sharp(profileImage.buffer)
                .resize(800, 800, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .jpeg({ quality: 80, progressive: true })
                .toBuffer();

            const cloudinaryResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: "image",
                        folder: "social-media/users",
                        public_id: `${userName}_${Date.now()}`,
                        overwrite: true
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(optimizedImageBuffer);
            });

            profileImageUrl = cloudinaryResult.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            userName,
            email,
            password: hashedPassword,
            gender,
            profileImage: profileImageUrl
        });

        // Render and send welcome email
        const html = await ejs.renderFile(
            path.join(__dirname, '../views/welcomeEmail.ejs'),
            {
                userName,
                email,
                gender,
                profileImage: profileImageUrl,
                FRONTEND_URL: process.env.FRONTEND_URL
            }
        );

        await sendEmail(
            email,
            `Welcome to Our Community, ${userName}!`,
            html
        );

        return res.status(200).json({
            success: true,
            message: "Registration done successfully 🎉"
        });

    } catch (error) {
        console.error(`❌ Auth register error: ${error}`);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};



export const login = async (req, res)=>{
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
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required." 
            });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials."
            });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials." 
            });
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '30d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        const userData = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            profileImage: user.profileImage,
            gender: user.gender,
            createdAt: user.createdAt
        };

        return res.status(200).json({
            success: true,
            message: "Login successful 🎉",
            token,
            user: userData
        });
    } catch (error) {
         console.error(`❌ Auth login controller error: ${error}`);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}