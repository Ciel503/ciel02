import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Imagem from '@/models/Imagem';

export async function GET() {
  try {
    await dbConnect();
    const imagens = await Imagem.find({}).sort({ createdAt: -1 });
    return NextResponse.json(imagens);
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar imagens' },
      { status: 500 }
    );
  }
} 