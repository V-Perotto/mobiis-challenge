import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload | string;
}

@Service()
export class UserMiddleware implements ExpressMiddlewareInterface {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(401).json({ error: 'Não autorizado - Sem autorização' });
        return; 
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        res.status(401).json({ error: 'Não autorizado - Sem token' });
        return;
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;

      req.user = decoded;
      
      next();
    } catch (e) {
      res.status(401).json({ error: 'Não autorizado' });
    }
  }
}