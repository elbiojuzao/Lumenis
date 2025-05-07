import mongoose, { Document, Schema } from 'mongoose';

export interface CupomDocument extends Document {
  codigo: string;
  tipo: "porcentagem" | "valor";
  valor: number;
  comissao: number;
  expiracao: Date;
  ativo: boolean;
}

const CupomSchema = new Schema<CupomDocument>({
  codigo: { type: String, required: true, unique: true },
  tipo: { type: String, enum: ["porcentagem", "valor"], required: true },
  valor: { type: Number, required: true },
  comissao: { type: Number, required: true },
  expiracao: { type: Date, required: true },
  ativo: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Cupom || mongoose.model<CupomDocument>('Cupom', CupomSchema);