import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

//signup a new user
export  const signup = async (req, res) => {
    const {email, password, fullName,bio} = req.body;

    try {
        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message: "All fields are required"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success: false, message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,email, password: hashedPassword, bio
        });

        const token = generateToken(newUser._id);

        res.json({success: true, userData: newUser, token, message: "Account created successfully"});
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message});
    }
}