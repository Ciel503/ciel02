import mongoose from 'mongoose';

const ImagemSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Imagem || mongoose.model('Imagem', ImagemSchema); 