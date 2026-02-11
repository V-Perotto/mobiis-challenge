import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { DocumentType } from '../enum/document-type';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  document!: string;

  @IsEnum(DocumentType, {
    message: `docType deve ser ${DocumentType.CPF} ou ${DocumentType.ESTRANGEIRO}`
  })
  @IsNotEmpty()
  docType!: DocumentType;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password!: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  document!: string;

  @IsEnum(DocumentType, {
    message: `docType deve ser ${DocumentType.CPF} ou ${DocumentType.ESTRANGEIRO}`
  })
  @IsNotEmpty()
  docType!: DocumentType;

  @IsString()
  @IsNotEmpty()
  password!: string;
}