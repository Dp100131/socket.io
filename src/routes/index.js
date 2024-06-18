import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { isLogin } from '../middleware/isLoggedIn.js';
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.get('/', isLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

export { router };
