import conexao from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken, verificarToken } from "../utils/tokenUtils.js";

export const cadastrarVendedor = async (req, res) => {
  const { usuario, senha } = req.body;
  const cargo = "Vendedor";

  try {
    const checkUserQuery = "SELECT * FROM usuarios WHERE usuario = ?";
    const [usuarioExistente] = await conexao.execute(checkUserQuery, [usuario]);

    if (usuarioExistente.length > 0) {
      return res.status(400).json({ error: "Usuario já cadastrado" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const insert =
      "INSERT INTO usuarios (usuario, cargo, senha) VALUES (?, ?, ?)";
    await conexao.execute(insert, [usuario, cargo, hashedPassword]);

    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário: ", error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

export const login = async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const checkUserQuery = "SELECT * FROM usuarios WHERE usuario = ?";
    const [usuarioExistente] = await conexao.execute(checkUserQuery, [usuario]);

    if (usuarioExistente.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const user = usuarioExistente[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = generateToken(user);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
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

export const logout = async (req, res) => {
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

export const usuarioLogado = async (req, res) => {
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
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(usuarioExistente[0]);
  } catch (error) {
    console.error("Erro ao verificar token: ", error);
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const updateUsuario = async (req, res) => {
  const iduser = req.params.iduser;
  const { usuario } = req.body;

  try {
    const query = "UPDATE usuarios SET usuario = ? WHERE iduser = ?";
    const params = [usuario, iduser];

    const [result] = await conexao.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const checkUserQuery = "SELECT * FROM usuarios WHERE iduser = ?";
    const [usuarioExistente] = await conexao.execute(checkUserQuery, [iduser]);

    res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: usuarioExistente[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário: ", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const deletarUsuario = async (req, res) => {
  const iduser = req.params.iduser;

  try {
    const deleteQuery = "DELETE FROM usuarios WHERE iduser = ?";
    const [result] = await conexao.execute(deleteQuery, [iduser]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário: ", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const query = "SELECT * FROM usuarios";
    const [rows] = await conexao.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getUsuarioPorNome = async (req, res) => {
  const { usuario } = req.params;

  try {
    const query = "SELECT * FROM usuarios WHERE usuario = ?";
    const [rows] = await conexao.execute(query, [usuario]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar usuário: ", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getUsuarioPorCargo = async (req, res) => {
  const { cargo } = req.params;

  try {
    const query = "SELECT * FROM usuarios WHERE cargo = ?";
    const [rows] = await conexao.execute(query, [cargo]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar usuário: ", error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

export const updateUserCargo = async (req, res) => {
  const { iduser, cargo } = req.body;

  try {
    if (!iduser) {
      console.error("ID do usuário está faltando");
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    if (!cargo) {
      console.error("Cargo está faltando");
      return res.status(400).json({ error: "Cargo é obrigatório" });
    }

    const cargosPermitidos = ["Vendedor", "Admin"];
    if (!cargosPermitidos.includes(cargo)) {
      console.error("Cargo inválido:", cargo);
      return res.status(400).json({
        error: "Cargo inválido",
        cargosPermitidos: cargosPermitidos,
      });
    }

    const checkUserQuery = "SELECT * FROM usuarios WHERE id = ?";
    const [usuarioExistente] = await conexao.execute(checkUserQuery, [iduser]);

    if (usuarioExistente.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const cargoAtual = usuarioExistente[0].cargo;

    const updateQuery = "UPDATE usuarios SET cargo = ? WHERE id = ?";
    await conexao.execute(updateQuery, [cargo, iduser]);

    const verificarQuery = "SELECT cargo FROM usuarios WHERE id = ?";
    const [verificarResultado] = await conexao.execute(verificarQuery, [
      iduser,
    ]);

    if (verificarResultado[0]?.cargo !== cargo) {
      console.error("Atualização do cargo falhou", {
        cargoEsperado: cargo,
        cargoAtual: verificarResultado[0]?.cargo,
      });
      return res.status(500).json({ error: "Falha ao atualizar cargo" });
    }

    res.status(200).json({
      message: "Cargo atualizado com sucesso",
      cargoAnterior: cargoAtual,
      novoCargo: cargo,
    });
  } catch (error) {
    console.error("Erro ao atualizar cargo do usuário:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message,
    });
  }
};
