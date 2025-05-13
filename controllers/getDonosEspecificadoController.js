const conexao = require ('../db');

export const getPorCPF = async(req, res) =>{
    const {cpf} = req.params;

    try{
        const getQuery = 'SELECT * FROM donos WHERE cpf= ?';
        const [rows] = await conexao.execute(getQuery, [cpf]);

        res.status(200).json(rows);
    }catch(error){
        console.error('Erro ao buscar dono: ', error);
        res.status(500).json({error: 'Erro ao buscar dono'});
    }
}

export const getPorNome = async(req, res) =>{
    const {nome} = req.params;

    try{
        const getQuery = 'SELECT * FROM donos WHERE cpf = ?';
        const [rows] = await conexao.execute(getQuery, [nome]);

        res.status(200).json(rows);
    }catch(error){
        console.error('Erro ao buscar dono: ',error);
        res.status(500).json({error: 'Erro ao buscar dono'});
    }
}

export const getPorPlaca = async(req, res) =>{
    const {placa} = req.params;

    try{
        const getQuery = 'SELECT * FROM donos WHERE placa = ?';
        const[rows] = await conexao.execute(getQuery, [placa]);

        res.status(200).json(rows);
    }catch(error){
        console.error('Erro ao buscar dono: ', error);
        res.status(500).json({error: 'Erro ao buscar dono'});
    }
}