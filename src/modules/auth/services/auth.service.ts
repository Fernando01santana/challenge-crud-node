// authentication.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/modules/users/repositories/user.repositorie';
import { CredentialsInvalid } from 'src/shared/exceptions/auth/auth.exception';
import { UserNotFoundException } from 'src/shared/exceptions/user/user.exception';
import { PasswordUtils } from 'src/shared/utils/encryptPassword';
import { LoginDto, ResponseLoginDto } from '../dto/auth.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly passwordUtils: PasswordUtils,
  ) {}

  async login(data: LoginDto): Promise<ResponseLoginDto> {
    try {
      const user = await this.usersRepository.findOne(data.email);

      if (!user) {
        throw new UserNotFoundException('Usuario nao encontrado');
      }
      const password = await this.passwordUtils.comparePasswords(
        data.password,
        user.password,
      );

      if (password == false) {
        throw new CredentialsInvalid('Credenciais invalidas');
      }

      const payload = { email: data.email };
      const accessToken = this.jwtService.sign(payload);

      return {
        access_token: accessToken,
      };
    } catch (error) {
      return error;
    }
  }
}
