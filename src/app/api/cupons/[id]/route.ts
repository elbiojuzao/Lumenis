import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Cupom from '../../../../models/Cupom';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();
    const cupom = await Cupom.findById(params.id);
    
    if (!cupom) {
      return NextResponse.json(
        { error: 'Cupom não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(cupom);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar cupom' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Se estiver alterando o código, verifica se já existe
    if (data.codigo) {
      const existingCupom = await Cupom.findOne({
        codigo: data.codigo,
        _id: { $ne: params.id }
      });
      
      if (existingCupom) {
        return NextResponse.json(
          { error: 'Já existe um cupom com este código' },
          { status: 400 }
        );
      }
    }

    // Atualizar data de modificação
    data.ultimaAtualizacao = new Date();
    
    const cupom = await Cupom.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );

    if (!cupom) {
      return NextResponse.json(
        { error: 'Cupom não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(cupom);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar cupom' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();
    const cupom = await Cupom.findById(params.id);

    if (!cupom) {
      return NextResponse.json(
        { error: 'Cupom não encontrado' },
        { status: 404 }
      );
    }

    // Verifica se o cupom já foi usado
    if (cupom.usado > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir um cupom que já foi utilizado' },
        { status: 400 }
      );
    }

    await Cupom.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: 'Cupom removido com sucesso' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover cupom' },
      { status: 500 }
    );
  }
} 