import mongoose, { Document, Schema } from 'mongoose';

export interface HomenagemDocument extends Document {
  nome: string;
  descricao: string;
  dataNascimento: Date;
  dataFalecimento: Date;
  imagemPrincipal?: string;
  galeria?: string[];
  musicaLink?: string;
  videoLink?: string;
  criadoPor: mongoose.Schema.Types.ObjectId;
  pedidoIds: mongoose.Schema.Types.ObjectId[];
  dataExpiracao: Date;
  criadoEm: Date;
}

const HomenagemSchema = new Schema<HomenagemDocument>({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  dataFalecimento: { type: Date, required: true },
  imagemPrincipal: String,
  galeria: [String],
  musicaLink: String,
  videoLink: String,
  criadoPor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pedidoIds: [{ type: Schema.Types.ObjectId, ref: 'Pedido' }],
  dataExpiracao: { type: Date, required: true },
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.models.Homenagem || mongoose.model<HomenagemDocument>('Homenagem', HomenagemSchema);