const conexao = require ('../db');

export const getPorPlaca = async(req, res) =>{
    const {placa} = req.params;

    try{
        const getQuery = 'SELECT * FROM carros WHERE placa = ?';
        const [rows] = await conexao.execute(getQuery, [placa]);

        res.status(200).json(rows);
    }catch(error){
        console.error('Erro ao buscar carro: ', error);
        res.status(500).json({error: 'Erro ao buscar carro'});
    }
}

export const getPorModelo = async(req, res) =>{
    const {modelo} = req.params;

    try{
        const getQuery= 'SELECT * FROM carros where modelo = ?'
        const [rows] = await conexao.execute(getQuery, [modelo]);
        
        res.status(200).json(rows);
    } catch(error){
        console.error('Erro ao buscar carro: ', error);
        res.status(500).json({error: 'Erro ao buscar carro'});
    }
}

export const getPorMarca = async(req, res)=>{
    const {marca} = req.params;
    
    try{
        const getQuery = 'SELECT * FROM carros WHERE marca = ?'
        const [rows] = await conexao.execute(getQuery, [marca]);

        res.status(200).json(rows);
    } catch(error){
        console.error('Erro ao buscar carro: ', error);
        res.status(500).json({error: 'Erro ao buscar dono'});
    }
}

export const getPorCor = async(req, res) =>{
    const {cor} = req.params;

    try{
        const getQuery = 'SELECT * FROM carros WHERE cor = ?'
        const [rows] = await conexao.execute(getQuery, [cor]);

        res.status(200).json(rows);
    } catch(error){
        console.error('Erro ao buscar carro: ', error);
        res.status(500).json({error: 'Erro ao buscar carro'});
    }
}