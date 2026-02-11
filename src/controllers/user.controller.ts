import { Authorized, Body, Get, JsonController, Post, Req, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import User from '../models/user';
import { Response } from 'express';
import { UserService } from "../services/user.service";
import { UserMiddleware } from "../middleware/auth.middleware";
import { OpenAPI } from "routing-controllers-openapi";
import { LoginDto, RegisterUserDto } from "../dtos/user";

interface CustomRequest extends Request {
  user?: {
    document: string;
    docType: string;
  };
}

@Service()
@JsonController("/")
export class UserController {
  constructor(private userService: UserService) {}

  @UseBefore(UserMiddleware)
  @OpenAPI({ 
    summary: 'Lista todos os usuários cadastrados',
    security: [{ bearerAuth: [] }]
  })
  @Get("/")
  async listUsers(
    @Res() res: Response
  ): Promise<Response> {
    try {
      const users = await this.userService.listAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  @UseBefore(UserMiddleware)
  @OpenAPI({ 
    summary: 'Retorna os dados do usuário logado via Token',
    security: [{ bearerAuth: [] }] 
  })
  @Get("/auth")
  async getUser(
    @Req() req: CustomRequest,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const document = req.user?.document ?? '';
      const result = await this.userService.getUserByDocument(document);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  @OpenAPI({ summary: 'Registra um novo usuário' })
  @Post("/register")
  async userRegister(
    @Body() userData: RegisterUserDto, 
    @Res() res: Response
  ): Promise<Response> {
    try {
      const newUser = await this.userService.registerUser(userData);
      return res.status(201).json(newUser);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  @OpenAPI({ summary: 'Login e retorno do Token JWT' })
  @Post("/login")
  async userLogin(
    @Body() loginData: LoginDto, 
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.userService.userLogin(loginData);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
} 



