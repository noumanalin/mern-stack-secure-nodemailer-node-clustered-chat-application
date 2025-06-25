import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage:{
        type:String,
        default: ""
    },
    gender: {
    type: String,
    enum: ["male", "female", "transgender"],
    required: true
  }
  
}, {timestamps:true})

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User =  mongoose.model("User", userSchema);

export {User}