import express from 'express';
import { verificarToken } from '../utils/tokenUtils.js';
import {
  cadastrarVendedor,
  login,
  logout,
  usuarioLogado,
  updateUsuario,
  deletarUsuario,
  getUser,
} from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/cadastrarvendedor', cadastrarVendedor);
router.post('/logar', login);
router.get('/logout', logout);
router.get('/usuariologado', verificarToken, usuarioLogado);
router.put('/atualizarusuario/:iduser', verificarToken, updateUsuario);
router.delete('/deletarusuario/:iduser,', verificarToken, deletarUsuario);
router.get('/listauser', verificarToken, getUser);

export default router;
