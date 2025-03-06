'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/style/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Tentando fazer login...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      console.log('Resposta recebida:', response.status);
      const data = await response.json();
      console.log('Dados recebidos:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      if (data.success) {
        console.log('Login bem-sucedido, redirecionando...');
        router.push('/');
      } else {
        throw new Error('Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`login-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-links">
          <a href="/adm" className="login-link">
            Voltar
          </a>
        </div>
      </div>
    </div>
  );
} 