import mongoose, { Schema, Document } from 'mongoose';
import { DocumentType } from '../enum/document-type';

export interface IUser extends Document {
  document: string;
  password: string;
  docType: DocumentType;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  document: { 
    type: String, 
    required: [true, 'Documento é obrigatório'],
    unique: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: [true, 'Senha é obrigatória'],
    select: false 
  },
  docType: { 
    type: String, 
    enum: Object.values(DocumentType),
    required: [true, 'Tipo de documento é obrigatório'],
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;