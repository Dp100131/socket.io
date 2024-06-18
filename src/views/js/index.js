const socket = io();

// Selecciono mis 3 botones que me permitirán conectarme a las salas
const connectRoom1 = document.getElementById('connectRoom1');
const connectRoom2 = document.getElementById('connectRoom2');
const connectRoom3 = document.getElementById('connectRoom3');

// Eventos para que al hacer click me conecte a las salas

connectRoom1.addEventListener('click', () => {
  socket.emit('connect_to_room', 'room1');
});

connectRoom2.addEventListener('click', () => {
  socket.emit('connect_to_room', 'room2');
});

connectRoom3.addEventListener('click', () => {
  socket.emit('connect_to_room', 'room3');
});

// Enviar mensaje

const sendMessage = document.getElementById('sendMessage');

sendMessage.addEventListener('click', () => {
  const message = prompt('Escribe tu mensaje:');

  socket.emit('message', message);
});

// Recibir el evento del mensaje
socket.on('send_message', data => {
  const { room, message } = data;
  const li = document.createElement('li');
  li.textContent = message;
  document.getElementById(room).append(li);
});
