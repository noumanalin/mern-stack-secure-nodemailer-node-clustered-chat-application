import express from 'express';
import { getMessages, SendMessage } from '../controllers/message.controller.js';
import { isLogedin } from '../middleware/isLogedIn.middleware.js';
import { sendMessageValidations, getMessagesValidation } from '../middleware/express-validator.js';
import { messageRateLimiter } from '../middleware/rate-limiting.js';

const MessageRoutes=express.Router()

MessageRoutes.post('/send_message', isLogedin, messageRateLimiter, sendMessageValidations, SendMessage)
MessageRoutes.post('/get_messages',isLogedin, getMessagesValidation, getMessages)

export default MessageRoutes