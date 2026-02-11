import { Service } from 'typedi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { isDocumentValid } from '../utils/document-validator';
import { LoginDto, RegisterUserDto } from '../dtos/user';
import { ILoginResponse, IUserResponse, IUserRegistered } from '../interfaces/user';

@Service()
export class UserService {

  async registerUser(userData: RegisterUserDto): Promise<IUserRegistered> {
    const { document, docType, password } = userData;
    
    const { valid } = await isDocumentValid(document, docType);
    if (!valid) {
      throw new Error(`Documento do tipo ${docType} inválido.`);
    }
  
    const existingUser = await User.findOne({ document });
    if (existingUser) {
      throw new Error('Documento já cadastrado no sistema.');
    }
  
    if (!password || password.length < 8) {
      throw new Error('A senha deve ter no mínimo 8 caracteres.');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({ 
      document, 
      docType,
      password: hashedPassword 
    });
  
    const { password: _, ...userResponse } = newUser.toObject();
    
    return {
      id: userResponse._id.toString(),
      document: userResponse.document,
      docType: userResponse.docType,
      createdAt: userResponse.createdAt
    };
  };

  async userLogin(loginData: LoginDto): Promise<ILoginResponse> {
    const { document, docType, password } = loginData;

    console.log("loginData", loginData)
    
    const user = await User.findOne({ 
      document: document.trim(), 
      docType: docType.toUpperCase()
    }).select('+password');

    console.log("user", user)
    
    if (!user) {
      throw new Error('Usuário não existe!');
    }

    const passwordValidates = await bcrypt.compare(password, user.password);

    if (!passwordValidates) throw new Error('Senha incorreta.');

    const token = jwt.sign(
      { id: user._id, document: user.document, docType: user.docType }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
    );

    return { token, user: { 
      document: user.document, 
      docType: user.docType 
    } };
  }

  async getUserByDocument(document: string): Promise<IUserResponse> {
    if (!document) throw new Error('Documento não identificado no token de autenticação.');

    const user = await User.findOne({ document });

    if (!user) throw new Error('Usuário não encontrado no banco de dados.');

    return { 
      id: user._id.toString(), 
      document: user.document, 
      docType: user.docType 
    };
  }

  async listAllUsers(): Promise<IUserResponse[]> {
    const users = await User.find().select('-password');
    if (!users) return [];
    return users as IUserResponse[];
  }

}
