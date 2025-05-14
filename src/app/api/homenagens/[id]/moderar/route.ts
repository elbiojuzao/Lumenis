import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Homenagem from '../../../../../models/Homenagem';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { status, motivoRejeicao } = await request.json();

    // Validar status
    if (!['aprovada', 'rejeitada'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    // Se for rejeição, motivo é obrigatório
    if (status === 'rejeitada' && !motivoRejeicao) {
      return NextResponse.json(
        { error: 'Motivo da rejeição é obrigatório' },
        { status: 400 }
      );
    }

    const updateData = {
      status,
      motivoRejeicao: status === 'rejeitada' ? motivoRejeicao : null,
      dataModeracao: new Date(),
      ultimaAtualizacao: new Date()
    };

    const homenagem = await Homenagem.findByIdAndUpdate(
      params.id,
      updateData,
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
      { error: 'Erro ao moderar homenagem' },
      { status: 500 }
    );
  }
} 