export interface IUserResponse {
  id: string;
  document: string;
  docType: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    document: string;
    docType: string;
  };
}

export interface IUserRegistered {
  id: string;
  document: string;
  docType: string;
  createdAt?: Date;
}