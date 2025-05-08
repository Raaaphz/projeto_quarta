const conexao = require('../db');

module.exports = {

    get: async(req, res) => {
        try{
            const query = 'SELECT idCarro, marca, modelo, ano, placa FROM carros';
            const [rows] = await conexao.execute(query);

            res.status(200).json(rows);
        } catch(error){
            console.error('Erro ao buscar carros: ', error);
            res.status(500).json({error: 'Erro ao buscar carros'});
        }
    },

    post : async(req, res) =>{
        const {marca, modelo, ano, placa} = req.body;
        try{
            const checkPlacaQuery = 'SELECT * FROM carros WHERE placa =?';
            const [PlacaExistente] = await conexao.execute(checkPlacaQuery, [placa]);
            
            if (PlacaExistente.length > 0) {
                return res.status(400).json({ error: 'Placa já cadastrada' });
            }            
            const insert = 'INSERT INTO carros (marca, modelo, ano, placa) VALUES (?,?,?,?)';
            await conexao.execute(insert, [marca, modelo, ano, placa]);            
            res.status(201).json({message:'Carro cadastrado com sucesso'});
        } catch (error) {
            console.error('Erro ao cadastrar carro:', error);
            res.status(500).json({error: 'erro ao cadastrar carro'});
        }
    }

}