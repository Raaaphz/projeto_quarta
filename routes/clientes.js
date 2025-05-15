const express = require("express");
const router = express.Router();

const clientesController = require("../controllers/clientesController");

router.get("/visualizarclientes", clientesController.get);
router.post('/cadastrarclientes/', clientesController.post);
router.delete('/deletarclientes/:cpf', clientesController.delete);
router.put('/updateclientes/:cpf', clientesController.put);

const {
    getPorCPF,
    getPorNome,
} = require ('../controllers/getClientesEspecificadoController');

router.get('/clienteporcpf', getPorCPF);
router.get('/clientepornome', getPorNome);

module.exports = router;