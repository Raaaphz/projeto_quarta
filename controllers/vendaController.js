const conexao = require ('../db');

export const vendaCarro = async(req, res) =>{
    const { valor, diavenda, cpf} = req.body;
    const { placa } = req.params;
    placa = placa.toUpperCase(); 

    try{
        //verificar se placa existe antes de inserir
        const [carro] = await conexao.execute('SELECT * FROM carros WHERE placa = ?', [placa]);
        if (carro.length === 0) {
            return res.status(404).json({ error: 'Placa não encontrada'})
        } 

        //Inserir dados da venda
        const vendaQuery = 'INSERT INTO vendas (valor, diavenda, cpf, placa) VALUES (?, ?, ?, ?)';
        await conexao.execute(vendaQuery, [valor, diavenda, cpf, placa])
    } catch (error) {
        console.error('Erro ao cadastar venda: ', error);
        res.status(500).json({ error:' Erro ao cadastar dono'})
    }
}