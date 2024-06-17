import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('src/views'));

const socketOnline = [];

app.get('/', (req, res) => {
  res.sendFile('src/views/index.html');
});

io.on('connection', socket => {
  socketOnline.push(socket.id);
  // Emisión básica
  socket.emit('welcome', 'Ahora estás conectado 😎.');

  socket.on('server', data => {
    console.log(data);
  });

  socket.on('last', message => {
    const last = socketOnline[socketOnline.length - 1];
    io.to(last).emit('salute', message);
  });
});

httpServer.listen(3000, () => {
  console.log('Listen en 3000');
});
