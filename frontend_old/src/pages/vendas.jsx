import { useState, useEffect } from 'react';
import Header from '../components/header';
import Vendas from '../components/vendas';
import { supabaseClient } from '../services/supabaseService';

const VendasPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <>
      <Header
        userName={user?.user_metadata?.name || 'Usuário'}
        userRole={user?.role || 'Vendedor'}
        isAdmin={user?.role === 'admin'}
      />
      <Vendas />
    </>
  );
};

export default VendasPage;
