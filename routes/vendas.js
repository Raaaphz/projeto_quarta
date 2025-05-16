const express = require("express");
const router = express.Router();

const {
    vendaCarro,
    getVenda,
    vendaPorDia,
    deletarVendas,
    updateVendas
} = require ('../controllers/vendasController');

router.post('/venda/:placa', vendaCarro);
router.get('/visualizarvenda', getVenda);
router.get('/vendapordia/:diavenda', vendaPorDia);
router.delete('/deletarvenda/:idvenda', deletarVendas);
router.put('/atualizarvenda/:idvenda', updateVendas);

module.exports = router;