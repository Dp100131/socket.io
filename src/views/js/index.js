const user = prompt('Escribe tu usuario');

const teachers = ['Daniel', 'Juan', 'GNDX'];

let socketNamespace, group;

const chat = document.getElementById('chat');
const namespace = document.getElementById('namespace');

if (teachers.includes(user)) {
  socketNamespace = io('/teachers');
  group = 'teachers';
} else {
  socketNamespace = io('/students');
  group = 'students';
}

socketNamespace.on('connect', () => {
  namespace.textContent = group;
});

// Lógica de envío de mensajes

const sendMessage = document.getElementById('sendMessage');

sendMessage.addEventListener('click', () => {
  const message = prompt('Escribe tu mensaje:');

  socketNamespace.emit('send_message', {
    message,
    user,
  });
});

socketNamespace.on('message', data => {
  const { user, message } = data;
  const li = document.createElement('li');
  li.textContent = `${user}: ${message}`;
  chat.append(li);
});
