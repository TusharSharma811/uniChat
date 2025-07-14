import express from 'express';

import { createServer } from 'http';
import { Server } from 'socket.io';
import SocketService from './services/socketService.ts';
import userRouter from './routes/user.route.ts';
import authRouter from './routes/auth.route.ts';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.route.ts';
import connectDB from './config/db.ts';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.urlencoded({ extended: true }));
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const socketService = new SocketService(io);
socketService.listen();

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);

server.listen(5000,async () => {
  await connectDB();
  console.log('listening on PORT:3000');
});
