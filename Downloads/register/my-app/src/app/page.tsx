import '../style/cards.css';
import dbConnect from '@/lib/mongodb';
import Imagem from '@/models/Imagem';

async function getImagens() {
  await dbConnect();
  const imagens = await Imagem.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(imagens));
}

export default async function Home() {
  const imagens = await getImagens();

  return (
    <div className="cards-container">
      {imagens.map((imagem: { _id: string; url: string; descricao: string }) => (
        <div key={imagem._id} className="card">
          <img
            src={imagem.url}
            alt={imagem.descricao}
            className="card-image"
          />
          <div className="card-content">
            <p className="card-description">{imagem.descricao}</p>
          </div>
        </div>
      ))}
    </div>
  );
}