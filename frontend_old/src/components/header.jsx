import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../assets/styles/header.css';

const Header = ({ userName, userRole, isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/vendas':
        return 'Gestão de Vendas';
      case '/carros':
        return 'Catálogo de Carros';
      case '/clientes':
        return 'Gestão de Clientes';
      default:
        return 'Sistema de Gestão';
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='header-content'>
        <h1 className='header-title'>{getPageTitle()}</h1>

        <div className='nav-buttons'>
          <Link to='/carros' className='nav-button'>
            <i className='fas fa-shopping-cart'></i>
            Cadastrar Carros
          </Link>
          <Link to='/clientes' className='nav-button'>
            <i className='fas fa-box'></i>
            Cadastrar Clientes
          </Link>
          <Link to='/vendas' className='nav-button'>
            <i className='fas fa-chart-bar'></i>
            Realizar Vendas
          </Link>
          {isAdmin && (
            <Link to='/admin' className='nav-button admin'>
              <i className='fas fa-cog'></i>
              Administração
            </Link>
          )}
        </div>

        <div className='user-info'>
          <div className='user-details'>
            <span className='user-name'>{userName}</span>
            <span className='user-role'>{userRole}</span>
          </div>
          <button onClick={handleLogout} className='logout-button'>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default Header;
