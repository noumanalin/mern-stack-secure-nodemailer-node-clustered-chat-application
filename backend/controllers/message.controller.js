import { validationResult } from "express-validator";
import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";

export const SendMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).json({
        success: false,
        errors: errorMessages,
        message: "🙏 Kindly fulfill all requirements."
        });
    }


    
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({
      success: false,
      message: `${!senderId ? "Sender Id" : !receiverId ? "Receiver Id" : "Message"} is required.`,
    });
  }

  try {
    const newMessage = await Message.create({ senderId, receiverId, message });

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId], $size: 2 }
    });

    if (conversation) {
      conversation = await Conversation.findByIdAndUpdate(
        conversation._id,
        { $push: { messages: newMessage._id } },
        { new: true }
      );
    } else {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
        messages: [newMessage._id]
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully 🎉",
      data: { newMessage, conversation }
    });

  } catch (error) {
    console.error(`❌ SendMessage controller error: ${error}`);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};







export const getMessages = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).json({
        success: false,
        errors: errorMessages,
        message: "🙏 Kindly fulfill all requirements."
        });
    }


  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({
      success: false,
      message: `${!senderId ? "Sender Id" : "Receiver Id"} is required.`
    });
  }

  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId], $size: 2 }
    }).populate("messages");

    if (!conversation) {
      conversation = await Conversation.create({ members: [senderId, receiverId], messages: [] });
    }

    return res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: conversation.messages
    });

  } catch (error) {
    console.error(`❌ getMessages controller error: ${error}`);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
