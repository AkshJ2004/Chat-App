import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

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

//Controller to login a user
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email})

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(userData._id);
        res.json({ success: true, userData, token, message: "Login successful" })
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

//Controller to check if user id authenticated
export const checkAuth = (req,res) =>{
    res.json({success: true, user: req.user});
}

//Controller to update user profile
export const updateProfile = async() => {
    try {
        const { profilePic,bio, fullName} = req.body;
        const userId = req.user._id;
        let updateUser;

        if(!profilePic){
            await User.findByIdAndUpdate(userId, {bio, fullName},{new:true});
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updateUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName},{new:true});
        }
        Response.json({success: true,user: updateUser})
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message})

    }
}