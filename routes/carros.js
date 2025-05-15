const express = require("express");
const router = express.Router();

const carrosController = require("../controllers/carrosController");

router.get("/visualizarcarro", carrosController.get);
router.post('/cadastarcarro',carrosController.post);
router.delete('/deletarcarro/:placa', carrosController.delete);
router.put('/updatecarro/:placa', carrosController.put);

const {
    getPorPlaca,
    getPorCor,
    getPorModelo,
    getPorMarca,
    getPorValor
} = require ('../controllers/getCarrosEspecificadosController');

router.get('/carroporplaca', getPorPlaca);
router.get('/carroporcor', getPorCor);
router.get('/carropormodelo', getPorModelo);
router.get('/carropormarca', getPorMarca);
router.get('/carroporvalor', getPorValor);

module.exports = router;