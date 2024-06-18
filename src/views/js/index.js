const socket = io();

const send = document.getElementById('send');
const disconnected = document.getElementById('disconnected');
const reconnected = document.getElementById('reconnected');

send.addEventListener('click', () => {
  if (socket.connected) socket.emit('is_connected', '¡Está conectado!');
});

disconnected.addEventListener('click', () => {
  socket.disconnect();
});

reconnected.addEventListener('click', () => {
  socket.connect();
});
