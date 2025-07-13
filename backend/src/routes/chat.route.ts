import { Router } from "express";
import { createChat, getChat, getChatMessages } from "../controllers/chat.controller.ts";
import { verifyJWT } from "../middleware/verifyJWT.ts";
const chatRouter = Router();

chatRouter.post("/", verifyJWT, createChat);
chatRouter.get("/:chatId/messages", verifyJWT, getChatMessages);
chatRouter.get("/:chatId", verifyJWT, getChat);
export default chatRouter;

