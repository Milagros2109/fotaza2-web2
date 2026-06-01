import { Router } from 'express';

import {login,loginForm, registro, registroForm
} from '../controller/auth.js';

const auth = Router();

auth.get('/login', loginForm);
auth.post('/login', login);
auth.get('/registro', registroForm);
auth.post('/registro', registro);

export default auth;