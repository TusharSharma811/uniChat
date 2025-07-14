
import { Server, Socket } from 'socket.io';

class SocketService {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  listen = () => {
    this.io.on('connection', (socket: Socket) => {
      console.log('🟢 New user connected:', socket.id);

      // Store current chat room for the socket
      let currentChatId: string | null = null;

      socket.on('join_chat', ({ chatId }) => {
        if (currentChatId) {
          socket.leave(currentChatId);
        }

        currentChatId = chatId;
        socket.join(chatId);
        console.log(`📥 User joined chat: ${chatId}`);
        socket.to(chatId).emit('joined_chat', { chatId });
      });

      socket.on('message', (message) => {
        if (!currentChatId) return;
        console.log(`💬 Message in ${currentChatId}:`, message);
        
        // Broadcast to all in room (including sender optionally)
        this.io.to(currentChatId).emit('message', { chatId: currentChatId, message });
      });

      socket.on('leave_chat', () => {
        if (currentChatId) {
          socket.leave(currentChatId);
          socket.to(currentChatId).emit('left_chat', { chatId: currentChatId });
          console.log(`🚪 User left chat: ${currentChatId}`);
          currentChatId = null;
        }
      });

      socket.on('disconnect', () => {
        if (currentChatId) {
          socket.to(currentChatId).emit('user_disconnected', { socketId: socket.id });
        }
        console.log('🔴 User disconnected:', socket.id);
      });
    });
  };
}

export default SocketService;
