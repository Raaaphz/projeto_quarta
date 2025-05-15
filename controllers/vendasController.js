const conexao = require ('../db');

const vendaCarro = async(req, res) =>{
    const { valor, diavenda, cpf} = req.body;
    const  vendido  = 's'
    const { placa } = req.params;
    placa = placa.toUpperCase(); 

    try{
        //verificar se placa existe antes de inserir
        const [carro] = await conexao.execute('SELECT * FROM carros WHERE placa = ?', [placa]);
        if (carro.length === 0) {
            return res.status(404).json({ error: 'Placa não encontrada'})
        } 

        //verificar se o cpf esta cadastrado
        const [cliente] = await conexao.execute('SELECT * FROM clientes WHERE cpf = ?', [cpf]);
        if (cliente.length === 0) {
            return res.status(404).json({ error: 'CPF não cadastrado'})
        }

        //Inserir dados da venda
        const vendaQuery = 'INSERT INTO vendas (valor, diavenda, cpf, placa) VALUES (?, ?, ?, ?)';
        await conexao.execute(vendaQuery, [valor, diavenda, cpf, placa])
    } catch (error) {
        console.error('Erro ao cadastar venda: ', error);
        res.status(500).json({ error:' Erro ao cadastar dono'})
    }

    try{
        const vendidoQuery = 'UPDATE carros SET vendido = ? WHERE UPPER(placa) = ?';
        await conexao.execute(vendidoQuery, [vendido])
    }catch (error) {

        console.error('Erro ao atualizar carro para VENDIDO: ', error);
        res.status(500).json({error: 'Erro ao atulizar carro para VENDIDO'})
    }
}

module.exports = { 
    vendaCarro 
}