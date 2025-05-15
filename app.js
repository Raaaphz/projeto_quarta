//importações
const express = require ('express');

//inicialização
const app = express();
const PORT = 8080;

// Middleware para interpretar JSON
app.use(express.json());

const carrosRoute = require('./routes/carros');
const donosRoute = require('./routes/clientes');
const vendaRoute = require('./routes/venda');

app.use("/carros", carrosRoute );
app.use("/donos", donosRoute);
app.use("/venda", vendaRoute);

//configurando servidor
app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT);
});