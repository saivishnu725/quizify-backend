import { Router } from 'express';
const router = Router();
import { login, register } from '../controllers/userController';

// Login route
router.post('/login', login);

// Login route
router.post('/register', register);

export default router;