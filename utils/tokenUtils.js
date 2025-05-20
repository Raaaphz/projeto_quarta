const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      usuario: user.usuario,
      cargo: user.cargo || "Vendedor",
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const setCookieToken = (res, token) => {
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
    path: "/",
  });
};

const verificarToken = (req, res, next) => {
  const token = req.cookie.auth_token;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      idUser: decoded.iduser,
      usuario: decoded.usuario,
      cargo: decoded.cargo,
    };

    next();
  } catch (error) {
    console.error("Token invalido: ", err);
    return res.status(401).json({ error: "Token inválido: " });
  }
};

module.exports = {
  generateToken,
  setCookieToken,
  verificarToken,
};
