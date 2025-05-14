import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Homenagem from '../../../models/Homenagem';

export async function GET() {
  try {
    await connectDB();
    const homenagens = await Homenagem.find()
      .populate('userId', 'nome email')
      .sort({ dataCriacao: -1 });
    return NextResponse.json(homenagens);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar homenagens' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Validações básicas
    if (!data.titulo || !data.mensagem || !data.userId) {
      return NextResponse.json(
        { error: 'Título, mensagem e usuário são obrigatórios' },
        { status: 400 }
      );
    }

    const homenagem = await Homenagem.create({
      ...data,
      status: 'pendente',
      visualizacoes: 0,
      dataCriacao: new Date(),
      ultimaAtualizacao: new Date()
    });

    // Popula os dados do usuário no retorno
    await homenagem.populate('userId', 'nome email');

    return NextResponse.json(homenagem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar homenagem' },
      { status: 400 }
    );
  }
} 