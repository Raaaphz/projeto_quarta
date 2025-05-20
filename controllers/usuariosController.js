const conexao = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken, setCookieToken } = require("../utils/tokenUtils");
const { json } = require("express");
const { patch } = require("../routes/carros");

const cadastrarVendedor = async (req, res) => {
  const { usuario, senha } = req.body;
  const cargo = "Vendedor";

  try {
    const checkUserQuery = "SELECT * FROM usuarios WHERE usuario = ?";
    const [usuarioExistente] = await conexao.execute(checkUserQuery, [usuario]);

    if (usuarioExistente.length > 0) {
      return res.status(400).json({ error: "usuario ja cadastrado" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const insert =
      "INSERT INTO usuarios (usuario, cargo,  senha) VALUES (?, ?, ?)";
    await conexao.execute(insert, [usuario, cargo, hashedPassword]);

    res.status(201).json({ message: "Usuario cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar usuario: ", error);
    res.status(500).json({ error: "Erro ao cadastrar cliente" });
  }
};

const login = async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const checkUserQuery = "SELECT * FROM usuarios WHERE usuario = ?";
    const [usuarioExistente] = await conexao.execute(checkUserQuery, [usuario]);

    if (usuarioExistente.length === 0) {
      return res.status(400).json({ error: "Usuario não encontrado" });
    }

    const user = usuarioExistente.rows[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = generateToken(user);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      patch: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("auth_token", token, cookieOptions);

    res.status(200).json({
      id: user.iduser,
      usuario: user.usuario,
      cargo: user.cargo,
    });
  } catch (error) {
    console.error("Erro no login: ", error);
    res.status(500).json({ error: "Erro no login" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });

    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    console.error("Erro no logout:", error);
    res.status(500).json({ error: "Erro no logout" });
  }
};

const usuarioLogado = async (req, res) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const checkUserQuery = "SELECT * FROM usuarios WHERE usuario = ?";
    const [usuarioExistente] = await conexao.execute(checkUserQuery, [
      decoded.usuario,
    ]);

    if (usuarioExistente.length === 0) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }
    res.status(200).json(userResult.rows[0]);
  } catch (error) {
    console.error("Erro ao verificar token: ", error);
    return res.status(401).json({ error: "Token inválido" });
  }
};

const updateUsuario = async (req, res) => {
  const iduser = req.params;
  const usuario = req.body;

  try {
    let hashedPassword;
    if (senha) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(senha, saltRounds);
    }

    const query = "UPDATE usuarios SET usuario = ? WHERE iduser = ?";
    const params = [usuario, iduser];

    const [result] = await conexao.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario não encontrado: ", error });
    }

    const getUser = "SELECT * FROM usuarios WHERE iduser = ?";
    const [userResult] = await conexao.execute(getUser, [iduser]);

    res.status(200).json({
      message: "Usuario atualizado com sucesso",
      user: userResult[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar usuario: ", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deletarUsuario = async (req, res) => {
  const iduser = req.params;

  try {
    const deleteQuery = "DELETE FROM usuarios WHERE iduser = ?";
    const [result] = await conexao.execute(deleteQuery, [iduser]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }

    res.status(200).json({ message: "Usuario deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuario: ", error);
    res.status(500).json({ error: "Erro ao deletar carro" });
  }
};

const getUser = async (req, res) => {
  try {
    const query = "SELECT * FROM usuarios";
    const [rows] = await conexao.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar usuario: ", error);
    res.status(500).json({ error: "Erro ao buscar usuario" });
  }
};

module.exports = {
  cadastrarVendedor,
  login,
  logout,
  usuarioLogado,
  updateUsuario,
  deletarUsuario,
  getUser,
};
