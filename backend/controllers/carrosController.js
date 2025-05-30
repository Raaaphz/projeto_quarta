import conexao from '../db.js';

export const get = async (req, res) => {
  try {
    const query = 'SELECT * FROM carros';
    const [rows] = await conexao.execute(query);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar carros: ', error);
    res.status(500).json({ error: 'Erro ao buscar carros' });
  }
};

export const post = async (req, res) => {
  const { marca, modelo, ano, cor, valor, placa, km } = req.body;
  const vendido = 'N';

  const placaNormalizada = placa.toUpperCase();

  try {
    const checkPlacaQuery = 'SELECT * FROM carros WHERE placa = ?';
    const [PlacaExistente] = await conexao.execute(checkPlacaQuery, [placaNormalizada]);

    if (PlacaExistente.length > 0) {
      return res.status(400).json({ error: 'Placa já cadastrada' });
    }

    const insert =
      'INSERT INTO carros (marca, modelo, ano, placa, cor, valor, vendido, km) VALUES (?,?,?,?,?,?,?,?)';
    await conexao.execute(insert, [marca, modelo, ano, placaNormalizada, cor, valor, vendido, km]);

    res.status(201).json({ message: 'Carro cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar carro:', error);
    res.status(500).json({ error: 'Erro ao cadastrar carro' });
  }
};

export const deleteCar = async (req, res) => {
  let { placa } = req.params;
  placa = placa.toUpperCase();

  try {
    const deleteQuery = 'DELETE FROM carros WHERE placa = ?';
    const [result] = await conexao.execute(deleteQuery, [placa]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    res.status(200).json({ message: 'Carro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar carro:', error);
    res.status(500).json({ error: 'Erro ao deletar carro' });
  }
};

export const put = async (req, res) => {
  let { placa } = req.params;
  placa = placa.toUpperCase();
  const { marca, modelo, ano, cor, valor, km } = req.body;

  try {
    const query =
      'UPDATE carros SET marca = ?, modelo = ?, ano = ?, cor = ?, valor = ?, km = ? WHERE UPPER(placa) = ?';
    const params = [marca, modelo, ano, cor, valor, km];

    const [result] = await conexao.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    const getCarro = 'SELECT * FROM carros WHERE UPPER(placa) = ?';
    const [carroResult] = await conexao.execute(getCarro, [placa]);

    res.status(200).json({
      message: 'Carro atualizado com sucesso',
      carro: carroResult[0],
    });
  } catch (error) {
    console.error('Erro ao atualizar carro: ', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
