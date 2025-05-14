import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Homenagem from '../../../../models/Homenagem';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();
    const homenagem = await Homenagem.findById(params.id)
      .populate('userId', 'nome email');
    
    if (!homenagem) {
      return NextResponse.json(
        { error: 'Homenagem não encontrada' },
        { status: 404 }
      );
    }

    // Incrementa visualizações apenas se a homenagem estiver aprovada
    if (homenagem.status === 'aprovada') {
      homenagem.visualizacoes += 1;
      await homenagem.save();
    }

    return NextResponse.json(homenagem);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar homenagem' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Atualizar data de modificação
    data.ultimaAtualizacao = new Date();
    
    const homenagem = await Homenagem.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    ).populate('userId', 'nome email');

    if (!homenagem) {
      return NextResponse.json(
        { error: 'Homenagem não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(homenagem);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar homenagem' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();
    const homenagem = await Homenagem.findById(params.id);

    if (!homenagem) {
      return NextResponse.json(
        { error: 'Homenagem não encontrada' },
        { status: 404 }
      );
    }

    await Homenagem.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: 'Homenagem removida com sucesso' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover homenagem' },
      { status: 500 }
    );
  }
} 