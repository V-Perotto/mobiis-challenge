import { DocumentType } from "../enum/document-type";

export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos ou se todos os dígitos são iguais (ex: 111.111.111-11)
  if (cleanCPF.length !== 11 || /^(\d)\1+$/.test(cleanCPF)) {
    return false;
  }

  let sum = 0;
  let rest;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleanCPF.substring(9, 10))) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
};

export const validateForeignDoc = (doc: string): boolean => {
  const cleanDoc = doc.trim();
  
  // Regra: Deve ser alfanumérico e ter entre 8 e 20 caracteres
  const foreignRegex = /^[a-zA-Z0-9]{8,20}$/;
  
  return foreignRegex.test(cleanDoc);
};

export const isDocumentValid = async (document: string, type: DocumentType): Promise<{ valid: boolean }> => {
  let isValid = false;

  if (type === DocumentType.CPF) {
    isValid = validateCPF(document);
  } else if (type === DocumentType.ESTRANGEIRO) {
    isValid = validateForeignDoc(document);
  }

  return { valid: isValid };
};
