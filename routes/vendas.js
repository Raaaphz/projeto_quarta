const express = require("express");
const router = express.Router();

const {
  vendaCarro,
  getVenda,
  deletarVendas,
  updateVendas,
  vendaPorVendedor,
} = require("../controllers/vendasController");

router.post("/venda/:placa", vendaCarro);
router.get("/visualizarvenda", getVenda);
router.get("/vendaporvendedor/:vendedor", vendaPorVendedor);
router.delete("/deletarvenda/:idvenda", deletarVendas);
router.put("/atualizarvenda/:idvenda", updateVendas);

module.exports = router;
