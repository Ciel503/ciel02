import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await dbConnect();
    console.log('Conectado ao banco de dados');

    // Criar hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    // Criar usuário de teste
    const testUser = new User({
      email: 'teste@teste.com',
      password: hashedPassword,
    });

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      return NextResponse.json({
        message: 'Usuário de teste já existe',
        user: {
          email: existingUser.email,
          createdAt: existingUser.createdAt
        }
      });
    }

    // Salvar o usuário
    await testUser.save();
    console.log('Usuário de teste criado com sucesso');

    return NextResponse.json({
      message: 'Usuário de teste criado com sucesso',
      user: {
        email: testUser.email,
        createdAt: testUser.createdAt
      }
    });
  } catch (error) {
    console.error('Erro ao criar usuário de teste:', error);
    return NextResponse.json(
      { error: 'Erro ao criar usuário de teste' },
      { status: 500 }
    );
  }
} 