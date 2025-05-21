import express from "express";
import { verificarToken } from "../utils/tokenUtils.js";
import {
  cadastrarVendedor,
  login,
  logout,
  usuarioLogado,
  updateUsuario,
  deletarUsuario,
  getAllUser,
  getUsuarioPorNome,
  getUsuarioPorCargo,
  updateUserCargo,
} from "../controllers/usuariosController.js";

const router = express.Router();

router.post("/cadastrarvendedor", cadastrarVendedor);
router.post("/logar", login);
router.get("/logout", logout);
router.get("/usuariologado", verificarToken, usuarioLogado);
router.put("/atualizarusuario/:iduser", verificarToken, updateUsuario);
router.delete("/deletarusuario/:iduser,", verificarToken, deletarUsuario);
router.get("/listauser", verificarToken, getAllUser);
router.get("/usuariopornome/:usuario", verificarToken, getUsuarioPorNome);
router.get("/usuarioporcargo/:cargo", verificarToken, getUsuarioPorCargo);
router.put("/atualizarcargo", verificarToken, updateUserCargo);

export default router;
