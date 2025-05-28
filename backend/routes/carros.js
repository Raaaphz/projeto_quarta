import express from 'express';
import * as carrosController from '../controllers/carrosController.js';
import {
  getPorPlaca,
  getPorCor,
  getPorModelo,
  getPorMarca,
  getPorKM,
  getPorValor,
  getVendidos,
} from '../controllers/getCarrosEspecificadosController.js';

const router = express.Router();

router.get('/visualizarcarro', carrosController.get);
router.post('/cadastrarcarro', carrosController.post);
router.delete('/deletarcarro/:placa', carrosController.deleteCar); // Changed from delete to deleteCar
router.put('/updatecarro/:placa', carrosController.put);

router.get('/carroporplaca/:placa', getPorPlaca);
router.get('/carroporcor/:cor', getPorCor);
router.get('/carropormodelo/:modelo', getPorModelo);
router.get('/carroporkm/:km', getPorKM);
router.get('/carropormarca/:marca', getPorMarca);
router.get('/carroporvalor/:valor', getPorValor);
router.get('/carrovendido/:vendido', getVendidos);

export default router;
