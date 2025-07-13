
import { Server } from 'socket.io';

class SocketService {
    io: Server;
  constructor(io: Server) {
    this.io = io;
  }

  listen = () => {
    this.io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('message', (msg) => {
        console.log('message received:', msg);
      });
        socket.on('join', (room) => {
            console.log(`user joined room: ${room}`);
            socket.join(room);
        });
        socket.to('room1').emit('message', 'Welcome to room1');
        

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
}

export default SocketService;
