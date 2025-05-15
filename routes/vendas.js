const express = require("express");
const router = express.Router();

const {
    vendaCarro
} = require ('../controllers/vendasController')

router.get('/venda/:placa', vendaCarro);

module.exports = router;