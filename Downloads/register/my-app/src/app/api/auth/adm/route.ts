import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { LoginAdm } from '@/models/LoginAdm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || '@0940Franciel';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, senha } = await request.json();

    // Buscar o administrador no banco de dados
    const admin = await LoginAdm.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, admin.senha);

    if (!senhaValida) {
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // Criar token JWT
    const token = jwt.sign(
      { 
        id: admin._id,
        email: admin.email,
        isAdmin: true
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Criar resposta com cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Login realizado com sucesso'
    });

    // Configurar cookie
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 dias
    });

    return response;
  } catch (error) {
    console.error('Erro no login administrativo:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
} 