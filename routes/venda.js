const express = require("express");
const router = express.Router();

const {
    vendaCarro
} = require ('../controllers/vendaController')

router.get('/venda/:placa', vendaCarro);

module.exports = router;