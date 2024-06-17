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
  console.log({ clientsCount: io.engine.clientsCount });
  console.log({ id: socket.id });
  socket.on('disconnect', () => {
    console.log({ id: socket.id, message: 'disconnect' });
  });
  socket.conn.once('upgrade', () => {
    console.log(
      'Hemos pasado de HTTP Long-polling a',
      socket.conn.transport.name
    );
  });
});

httpServer.listen(3000, () => {
  console.log('Listen en 3000');
});
