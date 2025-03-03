import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Por favor, defina a variável de ambiente MONGODB_URI');
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: Cached | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    cached = global.mongoose = { conn: null, promise: null };
    
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      cached!.conn = mongoose;
      return mongoose;
    });
  }

  try {
    const mongoose = await cached.promise;
    return mongoose;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default dbConnect; 