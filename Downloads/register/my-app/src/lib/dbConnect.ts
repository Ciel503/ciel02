import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ciel02';

if (!MONGODB_URI) {
  throw new Error(
    'Por favor, defina a variável de ambiente MONGODB_URI'
  );
}

export async function dbConnect() {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);

    if (connection.readyState === 1) {
      return Promise.resolve(mongoose);
    }
  } catch (error) {
    return Promise.reject(error);
  }
} 