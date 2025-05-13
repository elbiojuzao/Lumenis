import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Por favor defina a variável de ambiente MONGODB_URI no arquivo .env.local')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose)
    .catch(err => {
      console.error("Erro ao conectar ao MongoDB:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect