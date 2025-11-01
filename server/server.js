import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import { Socket } from "dgram";
import { use } from "react";

//Create Express app and Http Server
const app = express();
const server = http.createServer(app);

//Initialize socket.io server
export const io = new Server(server,{
    cors:{origin : "*"}
})

//Store Online Users

export const userSocketMap = {};

//Socket.io connection handler
io.on("connection", (socket)=>{
    const userID= Socket.handshake.query.userID;
    console.log("User Connected", userID);

    if(userID) userSocketMap[userID] = socket.id

    //Emit online user to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("User Disconnected",userID);
        delete userSocketMap[userID];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

//Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

//Routes Setup
app.use('/api/status', (req, res) => res.send("Server is running"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter)


//Connect to MongoDB
await connectDB()

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));