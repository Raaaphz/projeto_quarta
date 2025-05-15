const express = require("express");
const router = express.Router();

import {
    compraCarro,
    vendaCarro
} from ('../controllers/vendaController')

router.get('/venda/:placa', vendaCarro);

module.exports = router;