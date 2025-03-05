import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await dbConnect();
    console.log('Conectado ao banco de dados');

    const { email, senha } = await request.json();
    console.log('Dados recebidos:', { email, senha: senha ? 'presente' : 'ausente' });

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Criar hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        error: 'Usuário já existe',
        user: {
          email: existingUser.email,
          createdAt: existingUser.createdAt
        }
      });
    }

    // Criar novo usuário
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Salvar o usuário
    await newUser.save();
    console.log('Usuário criado com sucesso');

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: {
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    );
  }
} 