//importações
const express = require ('express');

//inicialização
const app = express();
const PORT = 8080;

// Middleware para interpretar JSON
app.use(express.json());

const carrosRoute = require('./routes/carros');
const clientesRoute = require('./routes/clientes');
const vendasRoute = require('./routes/vendas');

app.use("/carros", carrosRoute );
app.use("/clientes", clientesRoute);
app.use("/vendas", vendasRoute);

//configurando servidor
app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT);
});