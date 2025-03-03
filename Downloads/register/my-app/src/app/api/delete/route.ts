import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Imagem from '@/models/Imagem';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    await dbConnect();
    const deletedImage = await Imagem.findByIdAndDelete(id);

    if (!deletedImage) {
      return NextResponse.json(
        { error: 'Imagem não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar imagem' },
      { status: 500 }
    );
  }
} 