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

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (token === 'myToken') {
    next();
  } else {
    const err = new Error('No puedes pasar 🤬');

    err.data = {
      message: 'No pudiste ser autenticado.',
    };

    next(err);
  }
});

io.on('connection', socket => {
  console.log({ id: socket.id });
});

httpServer.listen(PORT, () => {
  console.log(`Revisar en el servidor: http://localhost:3000/`);
});
