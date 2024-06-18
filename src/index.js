import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const PORT = 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('src/views'));

app.get('/', (req, res) => {
  res.sendFile('src/views/index.html');
});

io.on('connection', socket => {
  socket.connectedRoom = '';

  socket.on('connect_to_room', roomId => {
    switch (roomId) {
      case 'room1':
        socket.join('room1');
        socket.connectedRoom = 'room1';
        break;

      case 'room2':
        socket.join('room2');
        socket.connectedRoom = 'room2';
        break;

      case 'room3':
        socket.join('room3');
        socket.connectedRoom = 'room3';
        break;

      default:
        break;
    }
  });

  socket.on('message', message => {
    const room = socket.connectedRoom;
    io.to(room).emit('send_message', {
      message,
      room,
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Revisar en el servidor: http://localhost:3000/`);
});
