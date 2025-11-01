import express from  "express";
import { getMessages, getUserForSidebar, markMessageAsSeen } from "../controllers/messageController";
import {protectRoute} from "../middleware/auth.js";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUserForSidebar);
messageRouter.get("/:id",protectRoute,getMessages);
messageRouter.put("mark/:id",protectRoute,markMessageAsSeen);

export default messageRouter;

