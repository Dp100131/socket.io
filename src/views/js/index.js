const socket = io({
  auth: 'myTken',
});

socket.on('connect_error', err => {
  console.log('Error de conexión 😵‍💫');
  console.log(err.message);
  console.log(err.data.message);
});
