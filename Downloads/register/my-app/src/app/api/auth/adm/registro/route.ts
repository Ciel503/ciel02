import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { LoginAdm } from '@/models/LoginAdm';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, senha } = await request.json();

    // Verificar se já existe um admin com este email
    const adminExistente = await LoginAdm.findOne({ email });

    if (adminExistente) {
      return NextResponse.json(
        { error: 'Este email já está em uso' },
        { status: 400 }
      );
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // Criar novo admin
    const novoAdmin = await LoginAdm.create({
      email,
      senha: senhaCriptografada
    });

    return NextResponse.json({ 
      success: true,
      message: 'Administrador criado com sucesso',
      admin: {
        id: novoAdmin._id,
        email: novoAdmin.email,
        createdAt: novoAdmin.createdAt
      }
    });
  } catch (error) {
    console.error('Erro ao criar administrador:', error);
    return NextResponse.json(
      { error: 'Erro ao criar administrador' },
      { status: 500 }
    );
  }
} 