'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/style/login.css';

export default function RegistroAdm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/adm/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao registrar administrador');
      }

      setSuccess('Administrador registrado com sucesso!');
      setTimeout(() => {
        router.push('/login-adm');
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao registrar administrador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Registro de Administrador</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}
        
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
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
} 