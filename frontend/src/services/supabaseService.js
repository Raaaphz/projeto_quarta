import { createClient } from '@supabase/supabase-js';

// Log environment variables availability (development only)
console.log('Environment variables status:', {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Present' : 'Missing',
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing',
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase Configuration Error:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseKey ? 'Set' : 'Missing',
    envMode: import.meta.env.MODE,
  });
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export const clienteService = {
  async getAll() {
    const { data, error } = await supabaseClient.from('clientes').select('*');
    if (error) throw error;
    return data;
  },

  async create(cliente) {
    const { data, error } = await supabaseClient.from('clientes').insert([cliente]).select();
    if (error) throw error;
    return data[0];
  },

  async getByCpf(cpf) {
    const { data, error } = await supabaseClient.from('clientes').select('*').eq('cpf', cpf).single();
    if (error) throw error;
    return data;
  },
};

export const carroService = {
  async getAll() {
    const { data, error } = await supabaseClient.from('carros').select('*');
    if (error) throw error;
    return data;
  },

  async getDisponivel() {
    const { data, error } = await supabaseClient.from('carros').select('*').eq('vendido', false);
    if (error) throw error;
    return data;
  },
};

export const vendaService = {
  async getAll() {
    const { data, error } = await supabaseClient.from('vendas').select(`
      *,
      clientes(nome, sobrenome),
      carros(marca, modelo),
      usuarios(usuario)
    `);
    if (error) throw error;
    return data;
  },

  async create(venda) {
    const { data, error } = await supabaseClient.from('vendas').insert([venda]).select();
    if (error) throw error;
    return data[0];
  },
};
