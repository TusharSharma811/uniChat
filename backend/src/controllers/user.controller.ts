import User from "../models/user.model.ts";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).select("-password").populate("chats friends", "-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
export const updateUserProfile = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, email, username, profilePicture, bio, preferredLanguage } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePicture = profilePicture || user.profilePicture;
        user.bio = bio || user.bio;
        user.preferredLanguage = preferredLanguage || user.preferredLanguage;

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
export const deleteUserAccount = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
