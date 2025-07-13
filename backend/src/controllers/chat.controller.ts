import Chat from "../models/chat.model.ts";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const createChat = async (req: Request, res: Response) => {
    const { participants } = req.body;

    try {
        if (!participants || participants.length < 2) {
            return res.status(400).json({ error: "At least two participants are required to create a chat" });
        }
        // Check if a chat already exists with the same participants
        const chatId = participants.sort().join("-");
        const existingChat = await Chat.findOne({ chatid: chatId });
        if (existingChat) {
            return res.status(400).json({ error: "Chat already exists with the same participants" });
        }
        const newChat = new Chat({ participants, chatid: chatId });
        await newChat.save();

        res.status(201).json({ message: "Chat created successfully", chat: newChat });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getChatMessages = async (req: Request, res: Response) => {
    const chatId = req.params.chatId;

    try {
        const chat = await Chat.findOne({ chatid: chatId }).populate('messages.sender', 'name profilePicture');
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        res.status(200).json(chat.messages);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getChat = async (req: Request, res: Response) => {
    const chatId = req.params.chatId;
    try {
        const chat = await Chat.findOne({ chatid: chatId }).populate('participants', 'name profilePicture');
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};