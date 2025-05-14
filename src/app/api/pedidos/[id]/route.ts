import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Pedido from '../../../../models/Pedido';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();
    const pedido = await Pedido.findById(params.id)
      .populate('userId', 'nome email')
      .populate('enderecoEntrega')
      .populate('produtos.produto');
    
    if (!pedido) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(pedido);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar pedido' },
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

    // Se estiver atualizando o status, adiciona a data da mudança
    if (data.status) {
      data[`data${data.status.charAt(0).toUpperCase() + data.status.slice(1)}`] = new Date();
    }
    
    const pedido = await Pedido.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    )
    .populate('userId', 'nome email')
    .populate('enderecoEntrega')
    .populate('produtos.produto');

    if (!pedido) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(pedido);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar pedido' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();
    const pedido = await Pedido.findById(params.id);

    if (!pedido) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    // Verifica se o pedido pode ser cancelado
    if (!['pendente', 'aprovado'].includes(pedido.status)) {
      return NextResponse.json(
        { error: 'Pedido não pode ser cancelado no status atual' },
        { status: 400 }
      );
    }

    // Atualiza o status para cancelado em vez de deletar
    pedido.status = 'cancelado';
    pedido.dataCancelamento = new Date();
    pedido.ultimaAtualizacao = new Date();
    await pedido.save();

    return NextResponse.json(
      { message: 'Pedido cancelado com sucesso' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao cancelar pedido' },
      { status: 500 }
    );
  }
} 