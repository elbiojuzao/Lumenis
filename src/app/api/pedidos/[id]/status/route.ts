import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Pedido from '../../../../../models/Pedido';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { status, observacao } = await request.json();

    // Validar status
    const statusValidos = ['pendente', 'aprovado', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];
    if (!statusValidos.includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    // Busca o pedido atual
    const pedidoAtual = await Pedido.findById(params.id);
    if (!pedidoAtual) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    // Validar transição de status
    const statusIndex = statusValidos.indexOf(status);
    const statusAtualIndex = statusValidos.indexOf(pedidoAtual.status);
    
    if (status !== 'cancelado' && statusIndex <= statusAtualIndex) {
      return NextResponse.json(
        { error: 'Transição de status inválida' },
        { status: 400 }
      );
    }

    // Prepara dados da atualização
    const updateData = {
      status,
      [`data${status.charAt(0).toUpperCase() + status.slice(1)}`]: new Date(),
      ultimaAtualizacao: new Date()
    };

    if (observacao) {
      updateData.observacoes = [
        ...(pedidoAtual.observacoes || []),
        {
          status,
          mensagem: observacao,
          data: new Date()
        }
      ];
    }

    const pedido = await Pedido.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    )
    .populate('userId', 'nome email')
    .populate('enderecoEntrega')
    .populate('produtos.produto');

    return NextResponse.json(pedido);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar status do pedido' },
      { status: 500 }
    );
  }
} 