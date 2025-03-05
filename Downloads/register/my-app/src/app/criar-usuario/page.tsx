'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/style/login.css';

export default function CriarUsuario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const response = await fetch('/api/auth/adm/check', {
          credentials: 'include'
        });
        const data = await response.json();

        if (!data.success) {
          console.log('Não autenticado, redirecionando para login...');
          router.replace('/login-adm');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.replace('/login-adm');
      }
    };

    verificarAutenticacao();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar usuário');
      }

      setMessage('Usuário criado com sucesso!');
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError(error instanceof Error ? error.message : 'Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Criar Novo Usuário</h1>
        
        {message && <div className="success-message">{message}</div>}
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
              placeholder="Digite o email do usuário"
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
              placeholder="Digite a senha do usuário"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`login-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Criando...' : 'Criar Usuário'}
          </button>
        </form>
      </div>
    </div>
  );
} 