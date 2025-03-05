import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    // Tentar buscar um usuário
    const user = await User.findOne({});
    
    return NextResponse.json({ 
      message: 'Conexão com o banco de dados estabelecida',
      user: user ? {
        email: user.email,
        createdAt: user.createdAt
      } : 'Nenhum usuário encontrado'
    });
  } catch (error) {
    console.error('Erro ao testar conexão:', error);
    return NextResponse.json(
      { error: 'Erro ao conectar com o banco de dados' },
      { status: 500 }
    );
  }
} 