const express = require("express");
const router = express.Router();

const controller = require("../controllers/carrosController");

router.get("/", controller.get);
router.post('/cadastarcarro',controller.post);

module.exports = router;