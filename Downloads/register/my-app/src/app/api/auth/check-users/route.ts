import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    console.log('Conectado ao banco de dados');
    
    const users = await User.find({});
    console.log('Usuários encontrados:', users.length);
    
    return NextResponse.json({ 
      message: 'Usuários encontrados',
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