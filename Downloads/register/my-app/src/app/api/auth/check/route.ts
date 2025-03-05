import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    // Buscar todos os usuários (apenas para verificação)
    const users = await User.find({});
    
    return NextResponse.json({ 
      message: 'Conexão com o banco de dados estabelecida',
      users: users.map(user => ({
        email: user.email,
        createdAt: user.createdAt
      }))
    });
  } catch (error) {
    console.error('Erro ao verificar usuários:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar usuários' },
      { status: 500 }
    );
  }
} 