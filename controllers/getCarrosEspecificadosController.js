const conexao = require ('../db');

const getPorPlaca = async(req, res) =>{
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

const getPorModelo = async(req, res) =>{
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

const getPorMarca = async(req, res)=>{
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

const getPorCor = async(req, res) =>{
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

const getPorValor = async(req, res) =>{
    const{valor} = req.params;

    try{
        const getQuery = 'SELECT * FROM carros WHERE valor = ?'
        const [rows] = await conexao.execute(getQuery, [valor]);

        res.status(200).json(rows);
    } catch(error){
        console.error('Erro ao buscar carro: ', error);
        res.status(500).json({error: 'Erro ao buscar carro'});
    }
}

const getVendidos = async(req, res) =>{
    const{vendido} = req.params;

    try{
        const getQuery = 'SELECT * FROM carros WHERE vendido = ?'
        const [rows] = await conexao.execute(getQuery, [vendido]);

        res.status(200).json(rows)
    } catch(error) {
        console.error('Erro ao buscar carro: ', error);
        res.status(500).json({error: 'Erro ao buscar carro'})
    }
}

module.exports = { 
    getPorCor, 
    getPorMarca, 
    getPorModelo, 
    getPorPlaca, 
    getPorValor, 
    getVendidos }