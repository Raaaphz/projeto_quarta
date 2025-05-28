import express from 'express';
import supabase from '../db.js';
import * as vendasController from '../controllers/vendasController.js';

const router = express.Router();

const { vendaCarro, getVenda, deletarVendas, updateVendas, vendaPorVendedor } = vendasController;

router.post('/venda/:placa', vendaCarro);
router.get('/visualizarvenda', getVenda);
router.get('/vendaporvendedor/:vendedor', vendaPorVendedor);
router.delete('/deletarvenda/:idvenda', deletarVendas);
router.put('/atualizarvenda/:idvenda', updateVendas);

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('vendas').select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
