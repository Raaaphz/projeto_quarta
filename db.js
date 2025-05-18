const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './database.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro ao conectar ao Supabase: URL ou chave ausente.');
  console.error('Verifique se o arquivo .env contém as variáveis SUPABASE_URL e SUPABASE_ANON_KEY.');
  console.log('SUPABASE_URL:', supabaseUrl);
  console.log('SUPABASE_KEY:', supabaseKey);
  throw new Error('Credenciais do Supabase não encontradas.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
