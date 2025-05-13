const express = require("express");
const router = express.Router();

const donosController = require("../controllers/donosController");

router.get("/visualizardonos", donosController.get);
router.post('/cadastrardono/:placa', donosController.post);
router.delete('/deletardono/:cpf', donosController.delete);
router.put('/updatedono/:cpf', donosController.put);

import {
    getPorCPF,
    getPorNome,
    getPorPlaca
} from '../controllers/getDonosEspecificadoController';

router.get('/donoporcpf', getPorCPF);
router.get('/donopornome', getPorNome);
router.get('/donoporplaca', getPorPlaca);

module.exports = router;