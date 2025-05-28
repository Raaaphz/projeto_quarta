import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import Login from './pages/login';
import Vendas from './pages/vendas';
import './assets/styles/index.css';

function ErrorFallback({ error }) {
  return (
    <div role='alert' style={{ padding: '20px' }}>
      <h2>Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Vendas />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
