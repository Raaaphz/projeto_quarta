const conexao = require ('../db');

const getPorCPF = async(req, res) =>{
    const {cpf} = req.params;

    try{
        const getQuery = 'SELECT * FROM clientes WHERE cpf= ?';
        const [rows] = await conexao.execute(getQuery, [cpf]);

        res.status(200).json(rows);
    }catch(error){
        console.error('Erro ao buscar cliente: ', error);
        res.status(500).json({error: 'Erro ao buscar cliente'});
    }
}

const getPorNome = async(req, res) =>{
    const {nome} = req.params;

    try{
        const getQuery = 'SELECT * FROM clientes WHERE cpf = ?';
        const [rows] = await conexao.execute(getQuery, [nome]);

        res.status(200).json(rows);
    }catch(error){
        console.error('Erro ao buscar cliente: ',error);
        res.status(500).json({error: 'Erro ao buscar cliente'});
    }
}

module.exports = {
    getPorCPF,
    getPorNome
}