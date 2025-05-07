import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  cpf?: string;
  email: string;
  senha: string;
  homenagemCreditos: number;
  emailVerificado: boolean;
  emailToken?: string;
  emailTokenExpira?: Date;
  dataCriada: Date;
  dataModificacao: Date;
  quantidadeHomenagens: number;
  dataNascimento?: Date;
  ultimoLogin?: Date;
  ultimaHomenagem?: string;
  statusConta: 'ativo' | 'inativo';
  isAdmin: boolean;
}

const UserSchema = new Schema<IUser>({
  nome: { type: String, required: true },
  cpf: { type: String },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true, select: false },
  homenagemCreditos: { type: Number, default: 0 },
  emailVerificado: { type: Boolean, default: false },
  emailToken: String,
  emailTokenExpira: Date,
  dataCriada: { type: Date, default: Date.now },
  dataModificacao: { type: Date, default: Date.now },
  quantidadeHomenagens: { type: Number, default: 0 },
  dataNascimento: Date,
  ultimoLogin: Date,
  ultimaHomenagem: String,
  statusConta: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  isAdmin: { type: Boolean, default: false }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);