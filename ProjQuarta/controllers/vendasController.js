const conexao = require("../db");

// Buscar todas as vendas
const getVenda = async (req, res) => {
  try {
    const query = "SELECT * FROM vendas";
    const [rows] = await conexao.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar vendas: ", error);
    res.status(500).json({ error: "Erro ao buscar vendas" });
  }
};

const vendaPorVendedor = async (req, res) => {
  const vendedor = req.params;

  try {
    const query = "SELECT * FROM vendas WHERE vendedor = ?";
    const [rows] = await conexao.execute(query, [vendedor]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar venda:", error);
    res.status(500).json({ error: "Erro ao buscar venda" });
  }
};

const vendaCarro = async (req, res) => {
  const { valor, diavenda, cpf } = req.body; //alterando let pra const (acho q nao quebra)
  const vendido = "S";
  let { placa } = req.params;
  placa = placa.toUpperCase();

  try {
    // Verificar se a placa existe
    const [carro] = await conexao.execute(
      "SELECT * FROM carros WHERE placa = ?",
      [placa]
    );
    if (carro.length === 0) {
      return res.status(404).json({ error: "Placa não encontrada" });
    }

    // Verificar se já foi vendido
    if (carro[0].vendido === "S") {
      return res.status(400).json({ error: "Carro já foi vendido" });
    }

    // Verificar se o CPF está cadastrado
    const [cliente] = await conexao.execute(
      "SELECT * FROM clientes WHERE cpf = ?",
      [cpf]
    );
    if (cliente.length === 0) {
      return res.status(404).json({ error: "CPF não cadastrado" });
    }

    // Padronizar data para "15052025" caso venha com "/"
    if (diavenda.includes("/")) {
      const partes = diavenda.split("/");
      diavenda = partes.join(""); // remove as barras
    }

    // Inserir venda
    const vendaQuery =
      "INSERT INTO vendas (valor, diavenda, cpf, placa, vendedor) VALUES (?, ?, ?, ?, ?)";
    await conexao.execute(vendaQuery, [valor, diavenda, cpf, placa, vendedor]);

    // Atualizar como vendido
    const vendidoQuery = "UPDATE carros SET vendido = ? WHERE UPPER(placa) = ?";
    await conexao.execute(vendidoQuery, [vendido, placa]);

    res.status(201).json({ message: "Venda registrada com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar venda: ", error);
    res.status(500).json({ error: "Erro ao processar a venda" });
  }
};

const deletarVendas = async (req, res) => {
  const idvenda = req.params; //alterando let pra const (acho q nao quebra)

  try {
    const deleteQuery = "DELETE FROM vendas WHERE idvenda = ?";
    const [result] = await conexao.execute(deleteQuery, [idvenda]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Venda não encontrada" });
    }

    res.status(200).json({ message: "Venda deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar venda: ", error);
    res.status(500).json({ error: "Erro ao deletar carro" });
  }
};

const updateVendas = async (req, res) => {
  const idvenda = req.params; //alterando let pra const (acho q nao quebra)
  const { valor, diavenda, cpf, placa, vendedor } = req.body;
  try {
    const query =
      "UPDATE vendas SET valor = ?, diavenda = ?, cpf = ?, placa = ?, vendedor = ? WHERE idvenda = ?";
    const params = [valor, diavenda, cpf, placa, idvenda, vendedor];

    const [result] = await conexao.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Venda não encontrada: ", error });
    }

    const getVenda = "SELECT * FROM vendas WHERE idvenda = ?";
    const [vendaResult] = await conexao.execute(getVenda, [idvenda]);

    res.status(200).json({
      message: "Venda atualizada com sucesso",
      venda: vendaResult[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar venda: ", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  vendaCarro,
  getVenda,
  vendaPorVendedor,
  deletarVendas,
  updateVendas,
};
