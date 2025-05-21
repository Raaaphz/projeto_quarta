const express = require("express");
const router = express.Router();

const carrosController = require("../controllers/carrosController");

router.get("/visualizarcarro", carrosController.get);
router.post("/cadastrarcarro", carrosController.post);
router.delete("/deletarcarro/:placa", carrosController.delete);
router.put("/updatecarro/:placa", carrosController.put);

const {
  getPorPlaca,
  getPorCor,
  getPorModelo,
  getPorMarca,
  getPorKM,
  getPorValor,
  getVendidos,
} = require("../controllers/getCarrosEspecificadosController");

router.get("/carroporplaca/:placa", getPorPlaca);
router.get("/carroporcor/:cor", getPorCor);
router.get("/carropormodelo/:modelo", getPorModelo);
router.get("/carroporkm/:km", getPorKM);
router.get("/carropormarca/:marca", getPorMarca);
router.get("/carroporvalor/:valor", getPorValor);
router.get("/carrovendido/:vendido", getVendidos);

module.exports = router;
