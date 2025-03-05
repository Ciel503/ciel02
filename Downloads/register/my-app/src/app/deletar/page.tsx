'use client';

import { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import '@/style/deletar.css';

interface Imagem {
  _id: string;
  url: string;
  descricao: string;
}

export default function DeletarImagem() {
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchImagens();
  }, []);

  const fetchImagens = async () => {
    try {
      const response = await fetch('/api/imagens');
      if (!response.ok) throw new Error('Erro ao carregar imagens');
      const data = await response.json();
      setImagens(data);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
      alert('Erro ao carregar imagens');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta imagem?')) return;

    setLoadingStates(prev => ({ ...prev, [id]: true }));

    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Erro ao deletar imagem');

      setImagens(prev => prev.filter(img => img._id !== id));
      alert('Imagem deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      alert('Erro ao deletar imagem');
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="delete-container">
      <h1 className="delete-title">Gerenciar Imagens</h1>

      <div className="cards-grid">
        {imagens.map((imagem) => (
          <div key={imagem._id} className={`card ${loadingStates[imagem._id] ? 'loading' : ''}`}>
            <img
              src={imagem.url}
              alt={imagem.descricao}
              className="card-image"
            />
            <div className="card-content">
              <p className="card-description">{imagem.descricao}</p>
              <button
                onClick={() => handleDelete(imagem._id)}
                disabled={loadingStates[imagem._id]}
                className="delete-button"
              >
                <div className="delete-icon">
                  <MdDelete />
                </div>
                {loadingStates[imagem._id] ? 'Deletando...' : 'Deletar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 