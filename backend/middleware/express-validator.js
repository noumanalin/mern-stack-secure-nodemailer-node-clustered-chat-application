import { body } from 'express-validator'


export const registerValidations = [
    body('userName')
    .trim()
    .notEmpty().withMessage('User name must not be empty.')
    .isLength({min:3, max:50}).withMessage('User name must have minimum three unique alpha character!')
    .escape()

    ,
    body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .escape()
    .normalizeEmail()
    ,
     body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character")
    ,
    body("profileImage")
    .optional()
    .isString().withMessage("Profile image must be a string (URL or path).")
    .trim()
    .escape(),

    body("gender")
    .trim()
    .notEmpty().withMessage("Gender is required.")
    .isIn(["male", "female", "transgender"]).withMessage("Gender must be either 'male', 'female', or 'transgender'.")
    .escape(),

    ,
]



export const loginValidations = [
     body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .escape()
    .normalizeEmail()
    ,
     body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character")
    
]




export const sendMessageValidations = [
  body('senderId')
    .trim()
    .notEmpty().withMessage("Sender ID must not be empty.")
    .isMongoId().withMessage("Sender ID must be a valid MongoDB ObjectId.")
    .escape(),

  body('receiverId')
    .trim()
    .notEmpty().withMessage("Receiver ID must not be empty.")
    .isMongoId().withMessage("Receiver ID must be a valid MongoDB ObjectId.")
    .escape(),

  body('message')
    .trim()
    .notEmpty().withMessage("Message must not be empty.")
    .isLength({ min: 1, max: 1000 }).withMessage("Message must be between 1 and 1000 characters.")
    .escape()
];

export const getMessagesValidation = [
  body('senderId')
    .trim()
    .notEmpty().withMessage("Sender ID is required.")
    .isMongoId().withMessage("Sender ID must be a valid MongoDB ObjectId.")
    .escape(),

  body('receiverId')
    .trim()
    .notEmpty().withMessage("Receiver ID is required.")
    .isMongoId().withMessage("Receiver ID must be a valid MongoDB ObjectId.")
    .escape()
];