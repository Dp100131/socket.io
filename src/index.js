import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { realTimeServer } from './realTimeServer.js';
import { router } from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Settings
app.set('port', process.env.PORT || 3000);
app.use(cookieParser());
// Routes
app.use(router);

// Public
app.use(express.static('src/public'));

// Run server
httpServer.listen(app.get('port'), () => {
  console.log(`Running: http://localhost:3000/`);
});

// Socket.io server
realTimeServer(httpServer);
