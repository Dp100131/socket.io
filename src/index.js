import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('src/views'));

app.get('/', (req, res) => {
  res.sendFile('src/views/index.html');
});

io.on('connection', socket => {
  socket.on('circle_position', position => {
    socket.broadcast.emit('move_circle', position);
  });
});

httpServer.listen(3000, () => {
  console.log('Listen en 3000');
});
