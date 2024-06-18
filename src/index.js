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
  socket.on('circle_position', position => {
    socket.broadcast.emit('move_circle', position);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Revisar en el servidor: http://localhost:3000/`);
});
