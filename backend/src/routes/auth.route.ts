import { Router } from "express";
import { registerUser, loginUser , googleauth , googleCallback } from "../controllers/auth.controller.ts";
const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post('/google', googleauth);

authRouter.get('/google/callback', googleCallback);


export default authRouter;
