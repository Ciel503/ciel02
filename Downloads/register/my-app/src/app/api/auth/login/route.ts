import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || '@0940Franciel';

export async function POST(request: Request) {
  try {
    console.log('Iniciando processo de autenticação...');
    const { email, password } = await request.json();
    console.log('Email recebido:', email);

    await dbConnect();
    console.log('Conectado ao banco de dados');

    const user = await User.findOne({ email });
    console.log('Usuário encontrado:', user ? 'Sim' : 'Não');

    if (!user) {
      console.log('Usuário não encontrado');
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Senha válida:', isValidPassword);

    if (!isValidPassword) {
      console.log('Senha incorreta');
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log('Token gerado com sucesso');

    const response = NextResponse.json({ 
      success: true,
      message: 'Login realizado com sucesso'
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 24 horas
    });
    console.log('Cookie configurado');

    return response;
  } catch (error) {
    console.error('Erro detalhado na autenticação:', error);
    return NextResponse.json(
      { error: 'Erro na autenticação' },
      { status: 500 }
    );
  }
} 