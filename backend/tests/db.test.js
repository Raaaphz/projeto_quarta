import supabase from '../db.js';

async function verificarConexao() {
  try {
    // Modified query to use correct count syntax
    const { data, error } = await supabase.from('carros').select('*', { count: 'exact', head: true });

    if (error) throw error;
    console.log('Conexão com o banco estabelecida');
    return true;
  } catch (error) {
    console.error('Erro na conexão:', error.message);
    return false;
  }
}

async function testarInsercao() {
  try {
    // Verificar conexão primeiro
    const conexaoOk = await verificarConexao();
    if (!conexaoOk) {
      console.error('Teste abortado devido a falha na conexão');
      return false;
    }

    // Dados de teste para um carro
    const carroDeTeste = {
      marca: 'Ferrari',
      modelo: 'Hibrido',
      ano: '2025',
      cor: 'Preto',
      valor: 50000,
      placa: 'ASDG-1234',
      vendido: 'nao',
      km: 550,
    };

    console.log('\nTentando inserir:', carroDeTeste);

    // Tentativa de inserção na tabela carros
    const { error: insertError } = await supabase.from('carros').insert([carroDeTeste]);

    if (insertError) {
      console.error('Erro ao inserir dados:', insertError.message);
      return false;
    }

    console.log('Inserção realizada');

    // Verificação da inserção
    const { data: verificacao, error: selectError } = await supabase
      .from('carros')
      .select('*')
      .eq('placa', carroDeTeste.placa)
      .single();

    if (selectError) {
      console.error('Erro ao verificar inserção:', selectError.message);
      return false;
    }

    if (!verificacao) {
      console.error('Carro não encontrado após inserção!');
      return false;
    }

    console.log('Dado encontrado no banco:', verificacao);
    return true;
  } catch (error) {
    console.error('Erro inesperado:', error.message);
    return false;
  }
}

// Executa o teste
console.log('Iniciando teste de inserção...\n');
testarInsercao().then((sucesso) => {
  if (sucesso) {
    console.log('\nTeste de inserção concluído com sucesso!');
  } else {
    console.log('\nTeste de inserção falhou!');
  }
  process.exit();
});
