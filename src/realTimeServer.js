import { Server } from 'socket.io';
export const realTimeServer = httpServer => {
  const io = new Server(httpServer);

  io.on('connection', socket => {
    const username = socket.handshake.headers.cookie.split('=').pop();
    socket.on('message', message => {
      io.emit('message', {
        user: username,
        message,
      });
    });
  });
};
