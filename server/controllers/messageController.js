import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from  "../lib/cloudinary.js";
import {io,userSocketMap} from "../server.js";

//Get all users exceopt logged in user
export const getUserForSidebar = async (req,res) =>{
    try{
        const userID = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userID}}).select("-password");

        const unseenMessages = {}
        const promises = filteredUsers.map(async(user) =>{
            const message = await Message.find({senderID : user._id, receiverId: userID, seen: false})
            if(message.length > 0){
                unseenMessages[user._id] = message.length;
            }
        })
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages})
    }catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message});    
    }
}


//Get all the message for selected  user
export const getMessages = async (req,res) =>{
    try {
        const {id : selectedUserID} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId : myId, receiverId: selectedUserID},
                {senderId : selectedUserID, receiverId: myId},
            ]
        })
        await Message.updateMany({senderId:selectedUserID, receiverId: myId},{seen:true});

        res.json({success:true,messages})
        
    } catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}


//api to mark message as seen using message id
export const markMessageAsSeen = async (req,res) =>{
    try {
        const{id} = req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success:true})
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}


//Send Message to selected user
export const sendMessage = async (req,res) =>{
    try{
        const {text,image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        //Emit new message to the reciever's socket
        const recieverSocketId = userSocketMap[receiverId];
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }

        res.json({success:true,newMessage});
    } catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

