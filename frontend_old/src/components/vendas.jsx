import { useState, useEffect } from 'react';
import { vendaService, carroService } from '../services/supabaseService';
import '../assets/styles/vendas.css';

const Vendas = () => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendasData] = await Promise.all([vendaService.getAll(), carroService.getDisponivel()]);
        setVendas(vendasData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className='vendas-container'>
      <section className='vendas-list'>
        <h2>Vendas Realizadas</h2>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Cliente</th>
              <th>Carro</th>
              <th>Valor</th>
              <th>Vendedor</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.idVenda}>
                <td>{venda.diavenda}</td>
                <td>{`${venda.clientes.nome} ${venda.clientes.sobrenome}`}</td>
                <td>{`${venda.carros.marca} ${venda.carros.modelo}`}</td>
                <td>R$ {venda.valor.toLocaleString()}</td>
                <td>{venda.usuarios.usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Vendas;
