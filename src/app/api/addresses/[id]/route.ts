import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Address from '../../../../models/Address';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();
    const address = await Address.findById(params.id);
    
    if (!address) {
      return NextResponse.json(
        { error: 'Endereço não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(address);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar endereço' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Se estiver definindo como principal, desativa outros endereços principais
    if (data.isMain) {
      const address = await Address.findById(params.id);
      if (address) {
        await Address.updateMany(
          { userId: address.userId, isMain: true },
          { isMain: false }
        );
      }
    }

    // Atualizar data de modificação
    data.ultimaAtualizacao = new Date();
    
    const updatedAddress = await Address.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );

    if (!updatedAddress) {
      return NextResponse.json(
        { error: 'Endereço não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedAddress);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar endereço' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();
    const address = await Address.findById(params.id);

    if (!address) {
      return NextResponse.json(
        { error: 'Endereço não encontrado' },
        { status: 404 }
      );
    }

    // Se for o endereço principal, define outro endereço como principal
    if (address.isMain) {
      const otherAddress = await Address.findOne({
        userId: address.userId,
        _id: { $ne: params.id }
      });
      
      if (otherAddress) {
        await Address.findByIdAndUpdate(otherAddress._id, { isMain: true });
      }
    }

    await Address.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: 'Endereço removido com sucesso' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover endereço' },
      { status: 500 }
    );
  }
} 