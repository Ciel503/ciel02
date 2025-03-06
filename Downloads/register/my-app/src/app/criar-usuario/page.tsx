'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/style/login.css';

interface User {
  _id: string;
  email: string;
  createdAt: string;
}

export default function CriarUsuario() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

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
        } else {
          // Buscar usuários após verificar autenticação
          fetchUsers();
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.replace('/login-adm');
      }
    };

    verificarAutenticacao();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/auth/get-users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      } else {
        setError('Erro ao carregar usuários');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setError('Erro ao carregar usuários');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
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

      if (data.success) {
        setSuccess('Usuário criado com sucesso!');
        setEmail('');
        setSenha('');
        fetchUsers(); // Atualiza a lista de usuários
      } else {
        setError(data.error || 'Erro ao criar usuário');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError('Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      const response = await fetch('/api/auth/get-users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Usuário excluído com sucesso!');
        fetchUsers(); // Atualiza a lista de usuários
      } else {
        setError(data.error || 'Erro ao excluir usuário');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      setError('Erro ao excluir usuário');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Criar Usuário</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Usuário'}
          </button>
        </form>

        <div className="users-list">
          <h2>Usuários Cadastrados</h2>
          {isLoadingUsers ? (
            <div className="loading-message">Carregando usuários...</div>
          ) : users.length === 0 ? (
            <div className="no-users-message">Nenhum usuário cadastrado</div>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  <span>{user.email}</span>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 