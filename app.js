//importações
const express = require ('express');

//inicialização
const app = express();
const PORT = 8080;

// Middleware para interpretar JSON
app.use(express.json());

const carrosRoute = require('./routes/carros')

app.use("/carros", carrosRoute );

//configurando servidor
app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT);
});