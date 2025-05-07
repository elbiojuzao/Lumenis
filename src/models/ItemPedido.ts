import mongoose, { Document, Schema } from 'mongoose';

export interface ItemPedidoDocument extends Document {
  tipoItem: 'homenagem' | 'plaquinha' | 'chaveiro';
  produtoId: mongoose.Schema.Types.ObjectId;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  homenagemId?: mongoose.Schema.Types.ObjectId;
  pedidoId: mongoose.Schema.Types.ObjectId;
}

const ItemPedidoSchema = new Schema<ItemPedidoDocument>({
  tipoItem: { type: String, enum: ['homenagem', 'plaquinha', 'chaveiro'], required: true },
  produtoId: { type: Schema.Types.ObjectId, required: true },
  nomeProduto: { type: String, required: true },
  quantidade: { type: Number, required: true },
  precoUnitario: { type: Number, required: true },
  homenagemId: { type: Schema.Types.ObjectId, ref: 'Homenagem' },
  pedidoId: { type: Schema.Types.ObjectId, ref: 'Pedido', required: true }
});

export default mongoose.models.ItemPedido || mongoose.model<ItemPedidoDocument>('ItemPedido', ItemPedidoSchema);