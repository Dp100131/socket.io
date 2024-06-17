const text = document.getElementById('text');
const emit = document.getElementById('emit-to-server');
const emitToLast = document.getElementById('emit-to-last');
const textLast = document.getElementById('text-last');
const socket = io();

socket.on('welcome', data => {
  text.textContent = data;
});

emit.addEventListener('click', () => {
  socket.emit('server', 'Hello servidor 👀');
});

emitToLast.addEventListener('click', () => {
  socket.emit('last', `Hello from socket ${socket.id}`);
});

socket.on('salute', data => {
  textLast.textContent = data;
});
