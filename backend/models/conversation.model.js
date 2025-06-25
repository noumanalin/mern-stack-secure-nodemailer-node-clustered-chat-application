import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members:[
        {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            required:true
        }
    ]
}, {timestamps:true})

export const Conversation = mongoose.model('Converation', conversationSchema)