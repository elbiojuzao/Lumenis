import mongoose, { Document, Schema } from 'mongoose';

export interface PedidoDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  dataCompra: Date;
  statusPagamento: string;
  statusPedido: string;
  valorTotal: number;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  itensFisico: boolean;
  formaPagamento: string;
  idTransacao: string;
  observacoes?: string;
}

const PedidoSchema = new Schema<PedidoDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dataCompra: { type: Date, default: Date.now },
  statusPagamento: { type: String, required: true },
  statusPedido: { type: String, required: true },
  valorTotal: { type: Number, required: true },
  endereco: {
    cep: { type: String, required: true },
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    complemento: String,
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true }
  },
  itensFisico: { type: Boolean, required: true },
  formaPagamento: { type: String, required: true },
  idTransacao: { type: String, required: true },
  observacoes: String
});

export default mongoose.models.Pedido || mongoose.model<PedidoDocument>('Pedido', PedidoSchema);