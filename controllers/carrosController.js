const conexao = require('../db');

module.exports = {

    get : async(req, res) => {
        try{
            const query = 'SELECT idCarro, marca, modelo, ano, placa, cor FROM carros';
            const [rows] = await conexao.execute(query);

            res.status(200).json(rows);
        } catch(error){
            console.error('Erro ao buscar carros: ', error);
            res.status(500).json({error: 'Erro ao buscar carros'});
        }
    },

    post : async(req, res) =>{
        const {marca, modelo, ano, placa, cor} = req.body;
        
        const placaNormalizada = placa.toUpperCase();
        try{
            const checkPlacaQuery = 'SELECT * FROM carros WHERE placa =?';
            const [PlacaExistente] = await conexao.execute(checkPlacaQuery, [placaNormalizada]);
            
            if (PlacaExistente.length > 0) {
                return res.status(400).json({ error: 'Placa já cadastrada' });
            }            
            const insert = 'INSERT INTO carros (marca, modelo, ano, placa, cor) VALUES (?,?,?,?)';
            await conexao.execute(insert, [marca, modelo, ano, placaNormalizada, cor]);            
            res.status(201).json({message:'Carro cadastrado com sucesso'});
        } catch (error) {
            console.error('Erro ao cadastrar carro:', error);
            res.status(500).json({error: 'erro ao cadastrar carro'});
        }
    },

    delete : async (req, res) => {
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
    },

    put: async (req, res) => {
        let { placa } = req.params;
        placa = placa.toUpperCase();
        const { marca, modelo, ano, cor } = req.body;

        try {
            const query = 'UPDATE carros SET marca = ?, modelo = ?, ano = ?, cor = ? WHERE UPPER(placa) = ?';
            const params = [marca, modelo, ano, cor, placa];

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
    }

}