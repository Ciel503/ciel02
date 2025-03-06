'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/style/login.css';

export default function LoginAdm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Iniciando tentativa de login...');
      const response = await fetch('/api/auth/adm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Resposta do login:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      if (data.success) {
        console.log('Login bem-sucedido, redirecionando...');
        // Redirecionar imediatamente após o login bem-sucedido
        window.location.href = '/criar-usuario';
      } else {
        throw new Error('Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login Administrativo</h1>
        
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
              placeholder="Digite o email administrativo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="form-input"
              placeholder="Digite a senha administrativa"
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