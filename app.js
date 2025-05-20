//importações
const express = require("express");
const supabase = require("./db.js");

//inicialização
const app = express();
const PORT = 8080;

// Middleware para interpretar JSON
app.use(express.json());

const carrosRoute = require("./routes/carros");
const clientesRoute = require("./routes/clientes");
const vendasRoute = require("./routes/vendas");
const usuariosRoute = require("./routes/usuarios.js");

app.use("/carros", carrosRoute);
app.use("/clientes", clientesRoute);
app.use("/vendas", vendasRoute);
app.use("/usuarios", usuariosRoute);

// Teste de conexão com o banco de dados
app.get("/health", async (req, res) => {
  try {
    // Teste de conexão básica com o Supabase
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    res.json({
      status: "ok",
      database: "Conectado",
      timestamp: new Date().toISOString(),
      message: "Conexão com o banco de dados bem-sucedida",
    });
  } catch (error) {
    console.error("Falha na verificação de saúde:", error.message);
    res.status(500).json({
      status: "error",
      message: "Falha na conexão com o banco de dados",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Update server startup check
app.listen(PORT, async () => {
  try {
    // Teste basico de conexão com o Supabase
    const { data, error } = await supabase.auth.getSession();
    console.log("Conexão bem-sucedida com o Supabase");
  } catch (error) {
    console.error("Falha na conexão:", error.message);
  }
  console.log(`Servidor rodando na porta: ${PORT}`);
});
