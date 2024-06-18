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

const teachers = io.of('teachers');
const students = io.of('students');

teachers.on('connection', socket => {
  console.log(socket.id + ' se ha conectado a la sala de teachers');

  socket.on('send_message', data => {
    teachers.emit('message', data);
  });
});

students.on('connection', socket => {
  console.log(socket.id + ' se ha conectado a la sala de students');
});

httpServer.listen(PORT, () => {
  console.log(`Revisar en el servidor: http://localhost:3000/`);
});
