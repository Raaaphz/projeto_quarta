import jwt from 'jsonwebtoken';

const JWT_SECRET = "minhaSuperChaveSecretaJWT1234567890!";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      usuario: user.usuario,
      cargo: user.cargo,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verificarToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
