import express from 'express';
import * as clientesController from '../controllers/clientesController.js';
import { getPorCPF, getPorNome } from '../controllers/getClientesEspecificadoController.js';

const router = express.Router();

router.get('/visualizarcliente', clientesController.get);
router.post('/cadastrarcliente', clientesController.post);
router.delete('/deletarcliente/:cpf', clientesController.del); // Changed from delete to del
router.put('/updatecliente/:cpf', clientesController.put);

router.get('/clienteporcpf/:cpf', getPorCPF);
router.get('/clientepornome/:nome', getPorNome);

export default router;
