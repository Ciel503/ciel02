'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/style/adicionar.css';

export default function AdicionarImagem() {
  const [file, setFile] = useState<File | null>(null);
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      
      // Criar URL para prévia da imagem
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const limparFormulario = () => {
    setFile(null);
    setFileName('');
    setDescricao('');
    setPreviewUrl('');
    // Limpar o input file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('descricao', descricao);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload');
      }

      // Mostrar mensagem de sucesso
      alert('Imagem enviada com sucesso!');
      // Limpar o formulário
      limparFormulario();

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Adicionar Nova Imagem</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Selecione uma imagem
          </label>
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              required
            />
            <div className="file-input-label">
              {fileName ? fileName : 'Arraste uma imagem ou clique para selecionar'}
            </div>
            {previewUrl && (
              <div className="preview-container">
                <img
                  src={previewUrl}
                  alt="Prévia da imagem"
                  className="image-preview"
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Descrição
          </label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="description-input"
            required
            placeholder="Digite uma descrição para a imagem"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`submit-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Enviando...' : 'Enviar Imagem'}
        </button>
      </form>
    </div>
  );
} 