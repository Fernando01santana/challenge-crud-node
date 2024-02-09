import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

config();
const configService = new ConfigService();
interface CustomJwtPayload extends jwt.JwtPayload {
  exp: number;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Token de autenticação não fornecido',
        });
      }

      const token = req.headers.authorization.split(' ')[1];
      if (!token || token === '') {
        return res.status(401).json({
          statusCode: 401,
          message: 'Token de autenticação não fornecido',
        });
      }
      const secretToken = configService.get('SECRET_KEY');

      const decodedToken = jwt.verify(token, secretToken) as CustomJwtPayload;
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Token expirado',
        });
      }

      const email = decodedToken.email; // Acessando o email diretamente do token decodificado
      req.body.email = email;
      next();
    } catch (error) {
      console.log(error);

      return res.status(401).json({
        statusCode: 401,
        message: 'Token inválido ou expirado',
      });
    }
  }
}
