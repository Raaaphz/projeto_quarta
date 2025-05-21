const express = require("express");
const router = express.Router();

const { verificarToken } = require("../utils/tokenUtils");
const {
  cadastrarVendedor,
  login,
  logout,
  usuarioLogado,
  updateUsuario,
  deletarUsuario,
  getUser,
} = require("../controllers/usuariosController");

router.post("/cadastrarvendedor", cadastrarVendedor);
router.post("/logar", login);
router.get("/logout", logout);
router.get("/usuariologado", verificarToken, usuarioLogado);
router.put("/atualizarusuario/:iduser", verificarToken, updateUsuario);
router.delete("/deletarusuario/:iduser,", verificarToken, deletarUsuario);
router.get("/listauser", verificarToken, getUser);

module.exports = router;
