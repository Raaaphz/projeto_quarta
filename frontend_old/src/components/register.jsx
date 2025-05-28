import { Link } from 'react-router-dom';
import '../assets/styles/register.css';

const Register = () => {
  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2>Criar Conta</h2>
        <form>
          <div className='input-group'>
            <input type='text' name='name' placeholder='Nome completo' required />
          </div>
          <div className='input-group'>
            <input type='email' name='email' placeholder='Email' required />
          </div>
          <div className='input-group'>
            <input type='password' name='password' placeholder='Senha' required />
          </div>
          <div className='input-group'>
            <input type='password' name='confirmPassword' placeholder='Confirmar senha' required />
          </div>
          <button type='submit' className='register-button'>
            Cadastrar
          </button>
          <div className='login-link'>
            Já tem uma conta? <Link to='/'>Faça login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
