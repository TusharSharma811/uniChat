import User from "../models/user.model.ts";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req : Request, res: Response) => {
    const { name, email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Create a new user
        if (!name || !email || !username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, username, password: hashedPassword });
        await newUser.save();
        const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '1h' });
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;
        if (!user || !isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '1h' });
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


export const googleauth = (req: Request, res: Response) => {
  const state = "some_random_state"; // Replace with actual state management
  const GOOGLE_CALLBACK_URL = `http://localhost:5000/api/auth/google/callback`;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
  const GOOGLE_OAUTH_SCOPES = [

"https%3A//www.googleapis.com/auth/userinfo.email",

"https%3A//www.googleapis.com/auth/userinfo.profile",

];
 const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${GOOGLE_OAUTH_SCOPES.join(" ")}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
}

export const googleCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query;
  if (!code || !state) {
    return res.status(400).json({ error: "Invalid request" });
  }
  try {
      const GOOGLE_CALLBACK_URL = `http://localhost:5000/api/auth/google/callback`;

    const tokenResponse = await fetch(
      `${process.env.GOOGLE_ACCESS_TOKEN_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code: code as string,
          redirect_uri: GOOGLE_CALLBACK_URL,
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error });
    }


    const userResponse = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${tokenData.id_token}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    console.log("userData:", userData);


    let user = await User.findOne({ email: userData.email });
    if (!user) {
      user = await User.create({
        username: userData.name,
        email: userData.email,
        password: " ", // No password for OAuth users
        googleId: userData.id,
      });
    }
    const JWT_SECRET = process.env.JWT_SECRET
    const token = jwt.sign({ id: user._id }, JWT_SECRET || 'fallback-secret', { expiresIn: "7d" });

    res.send(`
  <script>
    window.opener.postMessage(
      { type: "GOOGLE_AUTH", token: "${token}" },
      "http://localhost:5173"
    );
    window.close();
  </script>
`);
    
  } catch (err) {
    res.status(500).json({ error: "Google authentication failed" });
    console.error("Google auth error:", err);
  }
};