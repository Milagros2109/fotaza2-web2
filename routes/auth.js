import { Router } from "express";

import {
  login,
  loginForm,
  logout,
  registro,
  registroForm
  
} from "../controller/auth.js";

const auth = Router();

auth.get('/login', loginForm);
auth.post('/login', login);

auth.get('/registro', registroForm);
auth.post('/registro', registro);

auth.get('/logout', logout);
auth.post('/logout', logout);


export default auth;