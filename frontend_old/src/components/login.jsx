import '../assets/styles/login.css';

const Login = () => {
  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Login</h2>
        <form>
          <div className='input-group'>
            <input type='email' placeholder='Email' required />
          </div>
          <div className='input-group'>
            <input type='password' placeholder='Senha' required />
          </div>
          <button type='submit' className='login-button'>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
