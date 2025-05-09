const express = require("express");
const router = express.Router();

const controller = require("../controllers/carrosController");

router.get("/visualizarcarro", controller.get);
router.post('/cadastarcarro',controller.post);
router.delete('/deletarcarro/:placa', controller.delete);
router.put('/updatecarro/:placa', controller.put);

module.exports = router;