import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Imagem from '@/models/Imagem';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const descricao = formData.get('descricao') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      );
    }

    // Converter o arquivo para base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload para o Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: 'mongoapp',
    });

    // Conectar ao MongoDB e salvar os dados
    await dbConnect();
    const imagem = await Imagem.create({
      url: uploadResponse.secure_url,
      descricao,
    });

    return NextResponse.json(imagem);
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao processar o upload' },
      { status: 500 }
    );
  }
} 