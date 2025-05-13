const conexao = require ('../db');

// Função para validar CPF
function validarCPF(cpf) {
    // Remove todos os caracteres que não são números (ex: pontos, traços)
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos ou se todos os dígitos são iguais (o que é inválido)
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    // ----------- Cálculo do 1º dígito verificador -----------
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        // Multiplica cada um dos 9 primeiros dígitos por um peso que vai de 10 até 2
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    // Calcula o resto da divisão da soma por 11, multiplicada por 10
    let resto = (soma * 10) % 11;

    // Se o resto for 10 ou 11, considera 0 (regras da Receita Federal)
    if (resto === 10 || resto === 11) resto = 0;

    // Compara o resultado com o 10º dígito do CPF (primeiro dígito verificador)
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // ----------- Cálculo do 2º dígito verificador -----------
    soma = 0;
    for (let i = 0; i < 10; i++) {
        // Agora usa os 10 primeiros dígitos e pesos de 11 até 2
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    // Novamente calcula o dígito verificador
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    // Compara com o 11º dígito do CPF (segundo dígito verificador)
    return resto === parseInt(cpf.charAt(10));
}

module.exports={
    get : async(req, res) => {
        try{
            const query = 'SELECT idDono, nome, nascimento, logradouro, bairro, cep, cpf, placa FROM donos'
            const [rows] = await conexao.execute(query);

            res.status(200).json(rows);
        } catch(error){
            console.error('Erro ao buscar donos: ',error);
            res.status(500).json({error: 'Erro ao buscar donos'});
        }
    },

    post: async (req, res) => {
        const { nome, nascimento, logradouro, bairro, cep, cpf } = req.body;
        let { placa } = req.params;
        placa = placa.toUpperCase();

        // Validação do CPF
        if (!validarCPF(cpf)) {
            return res.status(400).json({ error: 'CPF inválido' });
        }

        try {
            const checkCPFquery = 'SELECT * FROM donos WHERE cpf = ?';
            const [CPFExistente] = await conexao.execute(checkCPFquery, [cpf]);

            if(CPFExistente.length > 0) {
                return res.status(400).json({error: 'CPF ja cadastrado'});
            }

            // Verificar se a placa existe antes de inserir
            const [carro] = await conexao.execute('SELECT * FROM carros WHERE placa = ?', [placa]);
            if (carro.length === 0) {
                return res.status(404).json({ error: 'Placa não encontrada' });
            }

            // Inserir dados do dono
            const insert = 'INSERT INTO donos (nome, nascimento, logradouro, bairro, cep, cpf, placa) VALUES (?, ?, ?, ?, ?, ?, ?)';
            await conexao.execute(insert, [nome, nascimento, logradouro, bairro, cep, cpf, placa]);

            res.status(201).json({ message: 'Dono cadastrado com sucesso' });

        } catch (error) {
            console.error('Erro ao cadastrar dono:', error);
            res.status(500).json({ error: 'Erro ao cadastrar dono' });
        }
    },

    delete : async (req, res) => {
        const { cpf } = req.params;

        try{
            const deleteQuery = 'DELETE FROM donos WHERE cpf = ?';
            const [result] = await conexao.execute(deleteQuery, [cpf]);

            if(result.affectedRows === 0) {
                return res.status(404).json({ error: 'Dono não encontrado' });
            }

            res.status(200).json({ message: 'Dono deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar dono:', error);
            res.status(500).json({ error: 'Erro ao deletar dono' });
        }
    },

    put : async (req, res) => {
        const { cpf } = req.params;
        const { nome, nascimento, logradouro, bairro, cep } = req.body;

        try {
            const updateQuery = 'UPDATE donos SET nome = ?, nascimento = ?, logradouro = ?, bairro = ?, cep = ? WHERE cpf = ?';
            const [result] = await conexao.execute(updateQuery, [nome, nascimento, logradouro, bairro, cep, cpf]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Dono não encontrado' });
            }

            res.status(200).json({ message: 'Dono atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar dono:', error);
            res.status(500).json({ error: 'Erro ao atualizar dono' });
        }
    }
}