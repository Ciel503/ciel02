# Gerenciador de Imagens

Um aplicativo web moderno para gerenciar imagens usando Next.js, MongoDB e Cloudinary.

## Funcionalidades

- Upload de imagens para Cloudinary
- Armazenamento de dados no MongoDB Atlas
- Visualização de imagens em cards
- Exclusão de imagens
- Interface responsiva e moderna

## Tecnologias Utilizadas

- Next.js 14
- MongoDB Atlas
- Cloudinary
- TypeScript
- CSS Modules
- React Icons

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ciel02.git
cd ciel02
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
MONGODB_URI=sua_uri_do_mongodb
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

- `/src/app` - Páginas e componentes principais
- `/src/style` - Arquivos CSS
- `/src/lib` - Configurações e utilitários
- `/src/models` - Modelos do MongoDB

## Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
