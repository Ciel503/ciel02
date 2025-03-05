import mongoose from 'mongoose';

const loginAdmSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LoginAdm = mongoose.models.LoginAdm || mongoose.model('LoginAdm', loginAdmSchema); 